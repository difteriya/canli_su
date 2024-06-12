// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export default function handler(req, res) {
  let hashedPassword = bcrypt.hashSync("12345678", 8);

  res
    .status(200)
    .json({ name: "John Doe", password: hashedPassword, mm: nanoid() });
}
