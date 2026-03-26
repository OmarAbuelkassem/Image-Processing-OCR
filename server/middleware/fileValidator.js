import { z } from "zod";

const schema = z.object({
  originalname: z.string().min(1, "File Must have a name."),
  mimetype: z.enum(["image/jpeg", "image/png", "image/webp"], {
    errorMap: () => ({
      message: "Only JPG, PNG, and WebP are supported",
    }),
  }),
  size: z.number().max(4 * 1024 * 1024, "Image must be under 4MB"),
});

export const imageValidate = (req, res, next) => {
  // 1- check if the file was uploaded
  if (!req.file) {
    const error = new Error("No image file uploaded.");
    res.status(400);
    return next(error);
  }

  //   2- check if the file matches the requirments
  const result = schema.safeParse(req.file);
  if (!result.success) {
    const errorMessage = result.error.errors[0].message;
    const error = new Error(errorMessage);
    res.status(400);
    return next(error);
  }
  next();
};
