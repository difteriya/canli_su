import nextConnect from "next-connect";
import { models, sequelize } from "../../../db";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

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

export async function getPostById(id) {
  return await models.blog.findOne({
    where: { id: Number(id) },
    include: {
      model: models.blog_lang,
      as: "blog_langs"
    }
  });
}



apiRoute
  .delete(async (req, res) => {
    const id = req.query.id;
    const record = await models.blog.findOne({
      where: { id: Number(id) }
    });
    if (!record) {
      return res.status(404).json({ error: "Tapilmadi" });
    }
    await record.destroy();
    res.status(200).json({ success: true });
  })
  .post(async (req, res) => {
    const id = req.query?.id === "new" ? "new" : Number(req.query?.id);

    const { blog_langs, ...restValues } = req.body;

    await sequelize.transaction(async (t) => {
      if (id === "new") {
        const r = await models.blog.create(restValues, { transaction: t });
        await models.blog_lang.bulkCreate(
          blog_langs.map((p) => ({ ...p, rid: r.id })),
          {
            transaction: t
          }
        );
      } else {
        await models.blog.update(
          restValues,
          {
            where: { id: Number(id) }
          },
          { transaction: t }
        );
        await models.blog_lang.bulkCreate(blog_langs, {
          updateOnDuplicate: ["title", "alias", "subtitle", "body"],
          transaction: t
        });
      }
    });

    res.status(200).json({ success: true });
  });

export default apiRoute;