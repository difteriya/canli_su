import nextConnect from "next-connect";
import { promises } from "fs";
const { readFile, writeFile } = promises;

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
  .get(async (req, res) => {
    const { id, lang } = req.query;
    const files = await readFile(`./public/locales/${lang}/${id}.json`);
    const data = JSON.parse(files);

    res.status(200).json(data);
  })
  .post(async (req, res) => {
    const { id, lang } = req.query;
    let data = {};
    req.body.map(({ key, value }) => {
      data[key] = value;
    });
    await writeFile(
      `./public/locales/${lang}/${id}.json`,
      JSON.stringify(data, null, 4)
    );

    res.status(200).json({ success: true });
  });

export default apiRoute;
