import express from "express";
import {
  getLikesByResId,
  getLikesByUserId,
  toggleLikeRes,
} from "../controllers/likeController.js";

const likeRoute = express.Router();

likeRoute.get("/get-like-by-user/:userId", getLikesByUserId);
likeRoute.get("/get-like-by-restaurant/:resId", getLikesByResId);
likeRoute.post("/like-restaurant", toggleLikeRes);

export default likeRoute;
