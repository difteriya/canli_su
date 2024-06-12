import nextConnect from "next-connect";
import db from "../../../db";

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

export async function getAllProducts() {
  return await db.models.products.findAll({
    raw: true,
    nest: true,
    include: {
      model: db.models.products_lang,
      as: "products_langs",
      where: { lang: "az" }
    },
    order: [["position", "ASC"]]
  });
}

apiRoute
  .get(async (req, res) => {
    let records = await getAllProducts();
    res.status(200).json(records);
  })
  .post(async (req, res) => {
    const c = req.query?.c;
    if (c === "sort-products") {
      let result = await db.models.products.bulkCreate(req.body, {
        updateOnDuplicate: ["position"]
      });
    }
    res.status(200).json({ success: true });
  });

export default apiRoute;
