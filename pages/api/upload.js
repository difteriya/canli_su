import nextConnect from "next-connect";
import multer from "multer";
// import sharp from "sharp";
import path from "path";
// import fs from "fs";
import { nanoid } from "nanoid";

const oneMegabyteInBytes = 1000000;
const outputFolderName = "./public/uploads";

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG and PNG"), false);
  }
};

const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 5 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // const folder = req.body.folder || ''; // Get folder name from request body or default to empty string

      // console.log(folder, req.body.folder)

      // cb(null, path.join('./public/uploads/', folder)); // Destination folder
      cb(null, outputFolderName);
    },
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname).toLowerCase();
      let filename = `${nanoid()}${ext}`;
      console.log(filename, file.originalname);
      cb(null, filename);
    }
  }),
  fileFilter
});

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

apiRoute.use(upload.single("single-file"));
// apiRoute.use(upload.array("multi-file-upload")); //multiple upload

apiRoute.post((req, res) => {
  return res.status(200).json({
    message: "File uploded successfully",
    filename: req.file.filename
  });

  // try {
  //   // sharp(req.file.path)
  //   //   .resize(200, 200, {
  //   //     fit: sharp.fit.inside,
  //   //     withoutEnlargement: true
  //   //   })
  //   //   .toFile(
  //   //     `${outputFolderName}/thumbs/${req.file.filename}`,
  //   //     (err, resizeImage) => {
  //   //       if (err) {
  //   //         console.log("test");
  //   //       } else {
  //   //         return res.status(200).json({
  //   //           message: "File uploded successfully",
  //   //           filename: req.file.filename
  //   //         });
  //   //       }
  //   //     }
  //   //   );
  // } catch (error) {
  //   console.error(error);
  // }
});

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
};
export default apiRoute;
