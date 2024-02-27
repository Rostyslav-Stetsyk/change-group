import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import filesRouter from "./routes/api/files-route.js";

const { PORT = 3000 } = process.env;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/files", filesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(({ status = 500, message = "Server error" }, req, res, next) => {
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server running. Use port: ${PORT}`);
});
