import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    const error = new Error("Only images are allowed.");
    error.statusCode = 400;
    callback(error, false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4 * 1024 * 1024 },
});
