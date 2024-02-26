import { ctrlWrapper } from "../decorators/index.js";
import fs from "fs/promises";
import path from "path";

const createNewFile = async (req, res, next) => {
  const uniqueName =
    Date.now() + "-" + Math.round(Math.random() * 1e9) + ".json";
  const filePath = path.resolve("./public/files/", uniqueName);

  await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
  console.log("File created");
};

export default { createNewFile: ctrlWrapper(createNewFile) };
