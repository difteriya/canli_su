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

export async function getPage(locale) {
  return await models.pages.findOne({
    where: { alias: "about" },
    raw: true,
    nest: true,
    include: {
      model: models.pages_lang,
      as: "pages_langs",
      where: {
        lang: locale
      }
    }
  });
}

apiRoute.get(async (req, res) => {
  const locale = req.query?.locale || "az";

  let page = await getPage(locale);

  res.status(200).json(page);
});

export default apiRoute;
