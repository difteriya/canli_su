import nextConnect from "next-connect";
import { models } from "../../db";
import {
  sendResetPasswordEmail,
  sendAccountVerificationEmail,
  verifyToken
} from "../../lib/email";
import bcrypt from "bcryptjs";

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

apiRoute.post(async (req, res) => {
  // const locale = req.query?.locale || "az";
  const c = req.query?.c;
  if (c === "password-change") {
    const { password, passwordConfirmation, uid } = req.body;

    let hashedPassword = bcrypt.hashSync(password, 8);
    await models.users.update(
      { password: hashedPassword },
      { where: { id: Number(uid) } }
    );
    res.status(200).send({ success: true });
  }
  if (c === "password-reset") {
    const { email } = req.body;
    const user = await models.users.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({
        type: "field-error",
        message: { email: "me:form-email-not-found" }
      });
    }

    sendResetPasswordEmail(email, user);

    res.status(200).send({ success: true });
  }
  if (c === "resend-verification-link") {
    const { uid } = req.body;
    const user = await models.users.findOne({ where: { id: Number(uid) } });
    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    sendAccountVerificationEmail(user.email, {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`
    });
    res.status(200).send({ success: true });
  }

  res.status(200).send(null);
});

export default apiRoute;
