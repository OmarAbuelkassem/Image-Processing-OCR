import express from "express";
import { process } from "../controllers/upController.js";
import { uploadLimit } from "../middleware/limiter.js";
import { upload } from "../middleware/multer.js";
import { imageValidate } from "../middleware/fileValidator.js";

const router = express.Router();

// 'image' is id of the image that react will upload so we can use it here.
router.post(
  "/upload",
  uploadLimit,
  upload.single("image"),
  imageValidate,
  process,
);

export default router;
