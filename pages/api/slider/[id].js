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
    let record = await models.slider.findOne({
      where: { id: Number(id) },
      include: {
        model: models.slider_lang,
        as: "slider_langs"
      }
    });
    res.status(200).json(record);
  })
  .delete(async (req, res) => {
    const id = req.query.id;
    const record = await models.slider.findOne({
      where: { id: Number(id) }
    });
    if (!record) {
      return res.status(404).json({ error: "Slayder tapilmadi" });
    }
    await record.destroy();
    res.status(200).json({ success: true });
  })
  .post(async (req, res) => {
    const id = req.query?.id;
    const { slider_langs } = req.body;

    await sequelize.transaction(async (t) => {
      if (id === "new") {
        const r = await models.slider.create(
          { position: 0 },
          { transaction: t }
        );
        await models.slider_lang.bulkCreate(
          slider_langs.map((p) => ({ ...p, rid: r.id })),
          {
            transaction: t
          }
        );
      } else {
        await models.slider.update(
          { position: 0 },
          {
            where: { id: Number(id) }
          },
          { transaction: t }
        );
        await models.slider_lang.bulkCreate(slider_langs, {
          updateOnDuplicate: ["title", "subtitle", "photo", "url"],
          transaction: t
        });
      }
    });
    // if (id === "new") {
    //   record = await models.products.create(restValues);
    //   const pLang = await models.products_lang.bulkCreate(products_lang);
    // } else {

    // }
    res.status(200).json({ success: true });
  });

export default apiRoute;
