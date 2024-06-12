import nc from "next-connect";
import bcrypt from "bcryptjs";

import { models, sequelize } from "../../../db";
import { sendAccountVerificationEmail, verifyToken } from "../../../lib/email";

const apiRoute = nc({
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

export async function verifyEmail(token) {
  const { payload, status } = await verifyToken(token);
  console.log(payload, status);
  if (status === "success") {
    try {
      await models.users.update({ status: 1 }, { where: { id: payload.sub } });
      return { user_id: payload.sub, status: "verified" };
    } catch (error) {
      throw new Error("Error");
    }
  }
  return { user_id: payload?.sub, status };
}

apiRoute.post(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    country,
    city,
    address
  } = req.body;
  const user = await models.users.findOne({ where: { email } });
  if (user) {
    return res.status(200).json({
      type: "field-error",
      message: { email: "me:form-email-is-taken" }
    });
  }
  let hashedPassword = bcrypt.hashSync(password, 8);
  const _user = await sequelize.transaction(async (t) => {
    const newUser = await models.users.create(
      {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone,
        country
      },
      { transaction: t }
    );
    await models.shipping_address.create(
      {
        user_id: newUser.id,
        first_name,
        last_name,
        phone,
        country,
        city,
        address
      },
      { transaction: t }
    );

    return newUser;
  });
  if (email && _user?.id) {
    sendAccountVerificationEmail(email, {
      id: _user?.id,
      name: `${first_name} ${last_name}`
    });
  }

  res.status(200).send({ success: true });
});

export default apiRoute;
