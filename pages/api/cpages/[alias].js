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
    const alias = req.query.alias;
    let record = await models.pages.findOne({
      where: { alias },
      include: {
        model: models.pages_lang,
        as: "pages_langs"
      }
    });

    res.status(200).json(record);
  })
  .delete(async (req, res) => {
    const alias = req.query.alias;
    const record = await models.pages.findOne({
      where: { alias }
    });
    if (!record) {
      return res.status(404).json({ error: "Sehife tapilmadi" });
    }
    await record.destroy();
    res.status(200).json({ success: true });
  })
  .post(async (req, res) => {
    const alias = req.query.alias;
    const { pages_langs, ...restValues } = req.body;

    await sequelize.transaction(async (t) => {
      if (alias === "new") {
        const r = await models.pages.create(restValues, { transaction: t });
        await models.pages_lang.bulkCreate(
          pages_langs.map((p) => ({ ...p, rid: r.id })),
          {
            transaction: t
          }
        );
      } else {
        await models.pages.update(
          restValues,
          {
            where: { alias }
          },
          { transaction: t }
        );
        await models.pages_lang.bulkCreate(pages_langs, {
          updateOnDuplicate: ["title", "body"],
          transaction: t
        });
      }
    });

    res.status(200).json({ success: true });
  });

export default apiRoute;
