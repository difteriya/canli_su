import nextConnect from "next-connect";
import multer from "multer";
import sharp from "sharp";
import path from "path";
// import fs from "fs";
import { nanoid } from "nanoid";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  signatureVersion: "v4"
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG and PNG"), false);
  }
};

const apiRoute = nextConnect({
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
  try {
    let { name, type, folder } = req.body;
    let ext = path.extname(name).toLowerCase();
    let filename = `${nanoid()}${ext}`;

    const fileParams = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: `${process.env.NODE_ENV}/${folder}/${filename}`,
      Expires: 200,
      ContentType: type
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.status(200).json({ url, filename, ext });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb" // Set desired value here
    }
  }
};
export default apiRoute;
