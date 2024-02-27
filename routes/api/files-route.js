import express from "express";
import filesController from "../../controllers/files-controller.js";

const filesRouter = express.Router();

filesRouter.patch("/", filesController.createNewFile);
filesRouter.get("/", filesController.getDate);
filesRouter.delete("/:accToDelete", filesController.deleteAcc);

export default filesRouter;
