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

export async function getMessages(page, limit = 20) {
  const offset = Number(page) * limit;
  const { count, rows } = await models.msg.findAndCountAll({
    offset,
    limit,
    order: [["id", "DESC"]]
  });

  return { count, rows };
}

apiRoute
  .get(async (req, res) => {
    const page = req.query?.page || 1;
    let { count, rows } = await getMessages(page);
    res.status(200).json({ count, rows });
  })
  .delete(async (req, res) => {
    const id = req.query.id;
    const record = await models.msg.findOne({
      where: { id: Number(id) }
    });
    if (!record) {
      return res.status(404).json({ error: "Tapilmadi" });
    }
    await record.destroy();
    res.status(200).json({ success: true });
  });

export default apiRoute;
