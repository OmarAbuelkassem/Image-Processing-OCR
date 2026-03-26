import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV || "Undefined"} mode on port ${port}.`,
  );
});
