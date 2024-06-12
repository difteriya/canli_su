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
  // const lang = req.query?.lang || "az";
  let record = await models.category.findAll({
    include: {
      model: models.category_lang,
      as: "category_langs",
      // where: {
      //   lang
      // }
    }
  });
  res.status(200).json(record);
});

export default apiRoute;
