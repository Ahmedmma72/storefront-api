import { Router } from "express";
import verifyAuthToken from "../services/verifyAuth";
import getUserOrders from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get('/', verifyAuthToken, getUserOrders);

export default orderRouter;
