import express from "express";
import { edit, see, upload, deleteVideo } from "../controllers/videoController";
const videoRouter = express.Router();

// const handleWatch = (req, res) => res.send("Watch Video");
// const handleEdit = (req, res) => res.send("Edit Video");

videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see); //\\d+ 숫자만 가져온다.
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;
