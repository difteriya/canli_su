import nextConnect from "next-connect";
import { models, sequelize } from "../../db";
import { endOfMonth, startOfMonth } from "date-fns";
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

export async function getDashboard(locale) {
  let { count: totalOrders, rows: lastOrders } =
    await models.orders.findAndCountAll({
      raw: true,
      limit: 8,
      order: [["id", "DESC"]]
    });

  const sumOrders = await models.orders.findOne({
    attributes: [[sequelize.fn("sum", sequelize.col("total")), "total_sum"]],
    raw: true,
    where: { status: 1 }
  });

  let startDate = startOfMonth(new Date());
  let endDate = endOfMonth(new Date());
  const monthOrders = await models.orders.findAll({
    attributes: ["id", "createdAt", "total"],
    where: { createdAt: { [Op.between]: [startDate, endDate] }, status: 1 },
    raw: true
  });

  let { count: totalUsers, rows: lastUsers } =
    await models.users.findAndCountAll({
      raw: true,
      limit: 8,
      order: [["id", "DESC"]]
    });

  return {
    totalOrders,
    lastOrders,
    sumOrders,
    monthOrders,
    totalUsers,
    lastUsers
  };
}

apiRoute.get(async (req, res) => {
  const locale = req.query?.locale || "az";
  const home = await getHome(locale);

  res.status(200).json(home);
});

export default apiRoute;
