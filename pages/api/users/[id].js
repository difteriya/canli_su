import nextConnect from "next-connect";
import { models } from "../../../db";
import bcrypt from "bcryptjs";
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

apiRoute
  .delete(async (req, res) => {
    const id = req.query.id;
    const record = await models.users.findOne({
      where: { id: Number(id) }
    });
    if (!record) {
      return res.status(404).json({ error: "Istifadeci tapilmadi" });
    }
    await record.destroy();
    res.status(200).json({ success: true });
  })
  .post(async (req, res) => {
    const id = req.query?.id === "new" ? "new" : Number(req.query?.id);

    const { confirm_password, change_password, password, ...restValues } =
      req.body;

    const checkEmail = await models.users.findOne({
      where: { email: restValues.email, id: { [Op.ne]: id } }
    });
    if (checkEmail) {
      return res.status(200).json({
        type: "field-error",
        message: { email: "Bu email artiq istifadə edilir" }
      });
    }

    let hashedPassword = bcrypt.hashSync(password, 8);
    if (id === "new") {
      await models.users.create({
        password: hashedPassword,
        ...restValues
      });
    } else {
      const v = change_password
        ? { ...restValues, password: hashedPassword }
        : restValues;
      await models.users.update(v, {
        where: { id }
      });
    }

    res.status(200).json({ success: true });
  });

export default apiRoute;
