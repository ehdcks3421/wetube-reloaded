import express from "express";
import all from "express/lib/application.js";
import {
  postEdit,
  getEdit,
  watch,
  deleteVideo,
  getUpload,
  postUpload,
} from "../controllers/videoController.js";
import { protectMiddleware, videoUpload } from "../middlewares.js";
const videoRouter = express.Router();

// const handleWatch = (req, res) => res.send("Watch Video");
// const handleEdit = (req, res) => res.send("Edit Video");

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectMiddleware)
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);

export default videoRouter;
