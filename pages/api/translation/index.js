import nextConnect from "next-connect";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

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

apiRoute.get(async (req, res) => {
  const action = req?.query?.c;
  if (action === "reload") {
    try {
      const res = await exec("pm2 reload 0");
      // console.log("res:", res);
      // console.log("stdout:", stdout);
      // console.log("stderr:", stderr);
      res.status(200).json({ success: true });
    } catch (e) {
      console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
    res.status(500).json({ success: true });
  }
});

export default apiRoute;
