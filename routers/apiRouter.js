import express from "express";
import routes from "../routes";
import { postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();

// not rendering, just communicate with API Server and Update View Info.

apiRouter.post(routes.registerView, postRegisterView);

export default apiRouter;
