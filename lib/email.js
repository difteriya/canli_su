import hbs from "handlebars";
import nodemailer from "nodemailer";
import { promises } from "fs";
import jwt from "jsonwebtoken";
const { readFile } = promises;

const templatePath = "./email_templates";
const emailConfig = {
  smtp: {
    host: "smtp.mail.eu-west-1.awsapps.com",
    port: 465,
    auth: {
      user: "info@canlisu.az",
      pass: "Su123456"
    },
    secure: true,
    debug: true
  },
  from: "info@canlisu.az"
};

// const emailConfig = {
//   smtp: {
//     host: "smtp.ethereal.email",
//     port: 587,
//     auth: {
//       user: "gudrun18@ethereal.email",
//       pass: "eprZgKC8NgDKhTCFDQ"
//     }
//   },
//   from: "gudrun18@ethereal.email"
// };

const transport = nodemailer.createTransport(emailConfig.smtp);

const sendEmail = async (to, subject, html, attachments = null) => {
  const mailOptions = {
    from: emailConfig.from,
    to,
    subject,
    html,
    attachments
  };
  await transport.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (to, user) => {
  const { id, name } = user;
  const token = generateToken(id, "password-reset");
  const subject = "Şifrənin bərpası";
  let confirmation_url = `${process.env.NEXT_PUBLIC_HOSTNAME}/password-reset/${token}`;
  let filePath = `${templatePath}/password-reset/az/content.html`;
  let data = { name, action_url: confirmation_url };

  const html = await generateHtmlAsync(filePath, data);
  await sendEmail(to, subject, html);
};

export const sendAccountVerificationEmail = async (to, user) => {
  const { id, name } = user;
  const token = generateToken(id, "email-verification");
  const subject = "Hesabınızı aktivləşdirin";
  let confirmation_url = `${process.env.NEXT_PUBLIC_HOSTNAME}/verify-email/${token}`;
  let filePath = `${templatePath}/email-verification/az/content.html`;
  let data = { name, action_url: confirmation_url };

  const html = await generateHtmlAsync(filePath, data);
  await sendEmail(to, subject, html);
};

const generateHtmlAsync = async (filePath, data) => {
  const html = await readFile(filePath, "utf8");
  let template = hbs.compile(html.toString());
  return template(data);
};

/*
0-refresh
1-email-verification
2-password-reset
*/
export const generateToken = (
  user_id,
  type,
  expires = "24h",
  secret = "secretCanlisu.az@2022"
) => {
  return jwt.sign(
    {
      sub: user_id,
      type
    },
    secret,
    { expiresIn: expires }
  );
};

export const verifyToken = async (token) => {
  try {
    return {
      payload: jwt.verify(token, "secretCanlisu.az@2022"),
      status: "success"
    };
  } catch (error) {
    // console.log(error.name);
    if (error.name == "TokenExpiredError") {
      return { payload: jwt.decode(token), status: "expired" };
    }
    if (error.name == "JsonWebTokenError") {
      return { payload: { sub: 0 }, status: "invalid" };
    }
  }
};

// const saveToken = async (token, userId, expires, type, blacklisted = false) => {
//   return await models.token.create({
//     token,
//     user_id: userId,
//     expires: expires.toDate(),
//     type,
//     blacklisted,
//   });
// };
