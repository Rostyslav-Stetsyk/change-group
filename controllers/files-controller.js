import { ctrlWrapper } from "../decorators/index.js";
import fs from "fs/promises";
import path from "path";

const filePath = path.resolve(
  "./public/files/",
  "telegram-group-nicknames.json"
);

const createNewFile = async (req, res, next) => {
  const uniqReqData = Array.from(new Set(req.body));
  const file = await fs.readFile(filePath, "utf8");
  const fileData = JSON.parse(file);

  const newFileData = Array.from(new Set(fileData.concat(uniqReqData)));

  await fs.writeFile(filePath, JSON.stringify(newFileData));

  res.status(200).json({ message: "Data updated", data: newFileData });
};

const getDate = async (req, res, next) => {
  const file = await fs.readFile(filePath, "utf8");
  const fileData = JSON.parse(file);

  res.status(200).json(fileData);
};

const deleteAcc = async (req, res, next) => {
  const accToDelete = req.params.accToDelete;

  const file = await fs.readFile(filePath, "utf8");
  const fileData = JSON.parse(file);

  const newFileData = fileData.filter((el) => el !== accToDelete);

  await fs.writeFile(filePath, JSON.stringify(newFileData));

  res.status(200).json({ message: "Acc deleted", data: newFileData });
};

export default {
  createNewFile: ctrlWrapper(createNewFile),
  getDate: ctrlWrapper(getDate),
  deleteAcc: ctrlWrapper(deleteAcc),
};
