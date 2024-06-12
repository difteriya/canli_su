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

apiRoute
  .get(async (req, res) => {
    const id = req.query.id;
    let record = await models.category.findOne({
      where: { id: Number(id) },
      include: {
        model: models.category_lang,
        as: "category_langs"
      }
    });
    res.status(200).json(record);
  })
  .delete(async (req, res) => {
    const id = req.query.id;
    const record = await models.category.findOne({
      where: { id: Number(id) }
    });
    if (!record) {
      return res.status(404).json({ error: "Kateqoriya tapilmadi" });
    }
    await record.destroy();
    res.status(200).json({ success: true });
  })
  .post(async (req, res) => {
    const id = req.query?.id;
    const { category_langs, ...restValues } = req.body;

    await sequelize.transaction(async (t) => {
      if (id === "new") {
        const r = await models.category.create(
          { position: 0, ...restValues },
          { transaction: t }
        );
        await models.category_lang.bulkCreate(
          category_langs.map((p) => ({ ...p, rid: r.id })),
          {
            transaction: t
          }
        );
      } else {
        await models.products.update(
          { position: 0, ...restValues },
          {
            where: { id: Number(id) }
          },
          { transaction: t }
        );
        await models.category_lang.bulkCreate(category_langs, {
          updateOnDuplicate: ["name"],
          transaction: t
        });
      }
    });

    res.status(200).json({ success: true });
  });

export default apiRoute;
