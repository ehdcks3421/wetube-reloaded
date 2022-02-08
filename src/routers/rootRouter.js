import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController.js";
import { home, search } from "../controllers/videoController.js";
import { publicOnlyMiddleware } from "../middlewares.js";

const rootRouter = express.Router();

// const handleHome = (req, res) => res.send("Home");
// const handleJoin = (req, res) => res.send("Join");

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
