import nextConnect from "next-connect";
import { models, sequelize } from "../../../../db";

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
  const limit = req.query?.limit || 21;
  const products = await getProducts(limit, locale);

  res.status(200).json(products);
});

export async function getProducts(limit, locale) {
  return await models.products.findAll({
    attributes: [
      "id",
      "position",
      "price",
      "photo",
      "category_id"
      // [sequelize.col("products_langs.name"), "name"]
      // [sequelize.col("category.category_langs.name"), "category_name"]
    ],
    limit: Number(limit),
    raw: true,
    nest: true,
    include: [
      {
        attributes: ["name"],
        model: models.products_lang,
        as: "products_langs",
        where: {
          lang: locale
        }
      },
      {
        attributes: ["id"],
        model: models.category,
        as: "category",
        include: {
          attributes: ["name"],
          model: models.category_lang,
          as: "category_langs",
          where: {
            lang: locale
          }
        }
      }
    ],
    order: [["position", "ASC"]]
  });
}

export default apiRoute;
