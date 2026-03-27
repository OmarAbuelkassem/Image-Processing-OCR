import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 7860;

app.listen(port, "0.0.0.0", () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV || "Undefined"} mode on port ${port}.`,
  );
});
