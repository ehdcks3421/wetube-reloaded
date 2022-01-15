import express from "express";
import {
  postEdit,
  getEdit,
  watch,
  upload,
  deleteVideo,
} from "../controllers/videoController";
const videoRouter = express.Router();

// const handleWatch = (req, res) => res.send("Watch Video");
// const handleEdit = (req, res) => res.send("Edit Video");

videoRouter.get("/:id(\\d+)", watch); //\\d+ 숫자만 가져온다.
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;
