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
  const locale = req.query?.locale || "az";
  let record = await models.slider.findAll({
    include: {
      model: models.slider_lang,
      as: "slider_langs",
      where: {
        lang: locale
      }
    }
  });
  res.status(200).json(record);
});

export default apiRoute;
