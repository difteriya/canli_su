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
    let record = await models.composition.findOne({
      where: { id: Number(id) },
      include: {
        model: models.composition_lang,
        as: "composition_langs"
      }
    });
    res.status(200).json(record);
  })
  .delete(async (req, res) => {
    const id = req.query.id;
    const record = await models.composition.findOne({
      where: { id: Number(id) }
    });
    if (!record) {
      return res.status(404).json({ error: "Suyun terkibi tapilmadi" });
    }
    await record.destroy();
    res.status(200).json({ success: true });
  })
  .post(async (req, res) => {
    const id = req.query?.id;
    const { composition_langs } = req.body;

    await sequelize.transaction(async (t) => {
      if (id === "new") {
        const r = await models.composition.create(
          { position: 0 },
          { transaction: t }
        );
        await models.composition_lang.bulkCreate(
          composition_langs.map((p) => ({ ...p, rid: r.id })),
          {
            transaction: t
          }
        );
      } else {
        await models.composition.update(
          { position: 0 },
          {
            where: { id: Number(id) }
          },
          { transaction: t }
        );
        await models.composition_lang.bulkCreate(composition_langs, {
          updateOnDuplicate: [
            "e_name",
            "e_symbol",
            "e_value",
            "description",
            "body"
          ],
          transaction: t
        });
      }
    });

    res.status(200).json({ success: true });
  });

export default apiRoute;
