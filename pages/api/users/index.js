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

export async function getUsers(all = false) {
  return await models.users.findAll({
    where: { is_admin: all ? [0, 1] : 0 },
    order: [["id", "DESC"]]
  });
}
export async function getUserById(id) {
  return await models.users.findOne({
    where: { id: Number(id) }
  });
}

apiRoute.get(async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});

export default apiRoute;
