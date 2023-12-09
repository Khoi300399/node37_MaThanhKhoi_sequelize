import express from "express";
import {
  getRateByResId,
  getRateByUserId,
  rateRes,
} from "../controllers/rateController.js";

const rateRoute = express.Router();

rateRoute.get("/get-rate-by-user/:userId", getRateByUserId);
rateRoute.get("/get-rate-by-restaurant/:resId", getRateByResId);
rateRoute.post("/rate-restaurant", rateRes);

export default rateRoute;
