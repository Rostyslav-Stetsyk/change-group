import { ctrlWrapper } from "../decorators/index.js";
import fs from "fs/promises";
import path from "path";

const createNewFile = async (req, res, next) => {
  const filePath = path.resolve(
    "./public/files/",
    "telegram-group-nicknames.json"
  );

  const uniqReqData = Array.from(new Set(req.body));
  const file = await fs.readFile(filePath, "utf8");
  const fileData = JSON.parse(file);

  const newFileData = Array.from(new Set(fileData.concat(uniqReqData)));

  await fs.writeFile(filePath, JSON.stringify(newFileData));

  res.status(200).json({ message: "Data updated", data: newFileData });
};

const getDate = async (req, res, next) => {
  const filePath = path.resolve(
    "./public/files/",
    "telegram-group-nicknames.json"
  );

  const file = await fs.readFile(filePath, "utf8");
  const fileData = JSON.parse(file);

  res.status(200).json(fileData);
};

export default {
  createNewFile: ctrlWrapper(createNewFile),
  getDate: ctrlWrapper(getDate),
};
