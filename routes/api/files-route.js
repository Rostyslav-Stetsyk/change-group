import express from "express";
import filesController from "../../controllers/files-controller.js";

const filesRouter = express.Router();

filesRouter.post("/", filesController.createNewFile);

export default filesRouter;
