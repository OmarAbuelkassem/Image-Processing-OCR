import ratelimit from "express-rate-limit";

export const uploadLimit = ratelimit({
  windowMs: 30 * 60 * 1000,
  max: 20,
  handler: (req, res, next) => {
    const error = new Error("too many uploads. Please try again in 30mins.");
    error.statusCode = 429; // "Too many Requests."
    return next(error);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
