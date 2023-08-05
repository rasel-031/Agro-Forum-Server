import multer from "multer";
import path from 'path'

export const postImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.PUBLIC_FILE_DIR + "/public/uploads/");
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + ".jpg");
    const fileExt = path.extname(file.originalname);
    const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
    cb(null, fileName + fileExt);
  },
});
