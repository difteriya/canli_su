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

export async function getOrders(page, limit = 20) {
  const offset = Number(page) * limit;
  const { count, rows } = await models.orders.findAndCountAll({
    offset,
    limit,
    // include: {
    //   attributes: ["first_name", "last_name"],
    //   model: models.users,
    //   as: "user"
    // },
    order: [["id", "DESC"]]
  });

  return { count, rows };
}

apiRoute.get(async (req, res) => {
  const orders = await getOrders();
  res.status(200).json(orders);
});

export default apiRoute;
