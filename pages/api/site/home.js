import nextConnect from "next-connect";
import { models } from "../../../db";
import { getProducts } from "./products";

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

export async function getHome(locale) {
  let composition = await models.composition.findAll({
    raw: true,
    nest: true,
    include: {
      model: models.composition_lang,
      as: "composition_langs",
      where: {
        lang: locale
      }
    }
  });

  const products = await getProducts(4, locale);

  let slider = await models.slider.findAll({
    raw: true,
    nest: true,
    include: {
      model: models.slider_lang,
      as: "slider_langs",
      where: {
        lang: locale
      }
    }
  });

  return { composition, slider, products };
}

apiRoute.get(async (req, res) => {
  const locale = req.query?.locale || "az";
  const home = await getHome(locale);

  res.status(200).json(home);
});

export default apiRoute;
