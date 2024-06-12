import nextConnect from "next-connect";
import { models, sequelize } from "../../../db";

const apiRoute = nextConnect({
  attachParams: true,
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

export async function getOrderActivity(id) {
  return await models.order_activity.findAll({
    where: { order_id: id },
    raw: true,
    nest: true,
    include: {
      model: models.users,
      as: "user",
      attributes: ["id", "first_name", "last_name"]
    },
    order: [["id", "DESC"]]
  });
}

export async function getOrderById(id) {
  return await models.orders.findOne({
    where: { id },
    include: {
      model: models.orders_item,
      as: "orders_items",
      include: {
        attributes: ["id"],
        model: models.products,
        as: "product",
        include: {
          attributes: ["name"],
          model: models.products_lang,
          as: "products_langs",
          where: { lang: "az" }
        }
      }
    }
  });
}

apiRoute
  .delete(async (req, res) => {
    const id = req.query.id;

    res.status(200).json({ success: true });
  })
  .post(async (req, res) => {
    let id = req.query.id;
    const c = req.query?.c;
    console.log("sssss", c);
    if (c === "changeStatus") {
      const { note, msg, user_id, ...restValues } = req.body;
      await models.orders.update(restValues, {
        where: { id: Number(id) }
      });
      await models.order_activity.create({
        type: 0,
        note,
        msg,
        user_id,
        order_id: id
      });
    } else {
      const { products, shipping, ...restValues } = req.body;
      await sequelize.transaction(async (t) => {
        if (id === "new") {
          const order = await models.orders.create(
            { ...restValues, ...shipping },
            { transaction: t }
          );
          id = order.id;
        } else {
          await models.orders.update(
            { ...restValues, ...shipping },
            {
              where: { id: Number(id) }
            },
            { transaction: t }
          );
        }

        await models.orders_item.destroy({
          where: {
            order_id: Number(id)
          }
        });

        await models.orders_item.bulkCreate(
          products.map(({ product_id, quantity, price }) => ({
            order_id: Number(id),
            product_id,
            quantity,
            price
          })),
          {
            transaction: t
          }
        );
      });
    }

    res.status(200).json({ success: true });
  });

export default apiRoute;
