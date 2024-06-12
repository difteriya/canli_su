import nextConnect from "next-connect";
import { models } from "../../../db";

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

apiRoute.get(async (req, res) => {
  let record = await models.pages.findAll({
    raw: true,
    include: {
      model: models.pages_lang,
      as: "pages_langs",
      where: { lang: "az" }
    }
  });

  console.log(record);
  const cpages =
    record?.map((r) => {
      return { id: r.id, alias: r.alias, title: r["pages_langs.title"] };
    }) || [];

  res.status(200).json(cpages);
});

export default apiRoute;
