import nextConnect from "next-connect";
import { models, sequelize } from "../../../../db";
import bcrypt from "bcryptjs";
import { authOptions } from "../../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

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

export async function getUser(id) {
  return await models.users.findOne({
    raw: true,
    attributes: { exclude: ["password", "is_admin", "createdAt", "updatedAt"] },
    where: { id: Number(id) }
  });
}

export async function getUserAddress(id) {
  return await models.shipping_address.findAll({
    raw: true,
    where: { user_id: Number(id) }
  });
}

export async function getUserOrders(id, page, limit = 20) {
  const offset = Number(page) * limit;
  const { count, rows } = await models.orders.findAndCountAll({
    offset,
    limit,
    where: { user_id: Number(id) },
    order: [["id", "DESC"]]
  });

  return { count, rows };
}

export async function getUserOrderById(id, orderId, lang) {
  const order = await models.orders.findOne({
    include: [
      {
        attributes: ["id", "price", "quantity"],
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
            where: { lang }
          }
        }
      }
    ],
    where: { id: orderId, user_id: Number(id) }
  });
  console.log({ order });

  return order;
}

export async function getUserSession(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  return session ? session?.user || null : null;
}

apiRoute.get(async (req, res) => {
  let u = await getUserSession(req, res);
  if (!u?.id) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const user = await getUser(u.id);
  res.status(200).json(user);
});

apiRoute.post(async (req, res) => {
  const c = req.query?.c;
  let rid;
  let u = await getUserSession(req, res);
  const uid = u?.id;
  if (!uid) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const user = await models.users.findOne({
    where: { id: Number(uid) }
  });
  if (!user) {
    return res.status(500).send("me:user-not-found");
  }

  if (c === "changePassword") {
    const { current_password, new_password } = req.body;
    const isCorrectPassword = await bcrypt.compare(
      current_password,
      user.password
    );
    if (!isCorrectPassword) {
      return res.status(200).json({
        type: "field-error",
        message: { current_password: "me:form-current-password-incorrect" }
      });
    }
    let hashedPassword = bcrypt.hashSync(new_password, 8);
    await models.users.update(
      { password: hashedPassword },
      { where: { id: Number(uid) } }
    );
  } else if (c === "shippingAddress") {
    const { id, ...restValues } = req.body;

    if (id) {
      const r = await models.shipping_address.update(restValues, {
        where: { id: Number(id), user_id: uid }
      });
      rid = r.id;
    } else {
      const r = await models.shipping_address.create({
        user_id: uid,
        ...restValues
      });
      rid = r.id;
    }
  } else if (c === "createOrder") {
    const { save_address, shipping_address, cart, ...restBody } = req.body;
    const { first_name, last_name, phone, country, city, address } =
      shipping_address;
    const order_id = await sequelize.transaction(async (t) => {
      const order = await models.orders.create(
        {
          total: cart.total,
          user_id: uid,
          first_name,
          last_name,
          phone,
          country,
          city,
          address,
          ...restBody
        },
        { transaction: t }
      );

      await models.orders_item.bulkCreate(
        cart.products.map(({ id, quantity, price }) => ({
          order_id: order.id,
          product_id: id,
          quantity,
          price
        })),
        {
          transaction: t
        }
      );

      if (save_address === true) {
        await models.shipping_address.create(
          {
            user_id: uid,
            first_name,
            last_name,
            phone,
            country,
            city,
            address
          },
          { transaction: t }
        );
      }

      return order.id;
    });
    rid = order_id;
  } else if (c === "checkCart") {
    console.log("ehmed");
    const ids = Object.keys(req.body);
    let products = await models.products.findAll({
      raw: true,
      where: { id: ids }
    });

    rid = products
      ?.map((p) => {
        if (req.body[p.id]) {
          return { ...p, quantity: req.body[p.id] };
        }
      })
      .filter(Boolean);
  } else {
    const checkEmail = await models.users.findOne({
      where: { email: req.body.email }
    });
    if (checkEmail && checkEmail.id !== uid) {
      return res.status(200).json({
        type: "field-error",
        message: { email: "me:form-email-is-taken" }
      });
    }
    await models.users.update(req.body, { where: { id: Number(uid) } });
  }

  res.status(200).json({ type: "success", rid });
});

export default apiRoute;
