import Tesseract from "tesseract.js";
import { v4 as uuidv4 } from "uuid"; // uuid stands for Universal Unique IDs
import path from "path";
export const process = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Please upload a file.");
      res.status(400);
      return next(error);
    }
    // Sanitize the file name before saving it in memeory
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    const uniqueId = uuidv4();
    const safeFileName = `${uniqueId}${fileExtension}`;

    req.safeFilename = safeFileName;
    console.log(`file saved in memory: ${safeFileName}`);

    const {
      data: { text },
    } = await Tesseract.recognize(req.file.buffer, "eng", {
      logger: (m) => console.log(m.status, Math.round(m.progress * 100) + "%"),
    });

    res.status(200).json({
      status: "Image uploaded Successfully",
      OrignalfileName: req.file.originalname,
      FileID: req.safeFilename,
      size: req.file.size,
      extractedText: text.trim(),
    });
  } catch (error) {
    next(error);
  }
};
