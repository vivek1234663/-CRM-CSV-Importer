import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },

  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,

  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".csv") {
      return cb(new Error("Only CSV files are allowed"));
    }

    cb(null, true);
  },
});

export default upload;