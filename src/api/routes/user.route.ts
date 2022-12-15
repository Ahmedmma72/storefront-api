import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller";
import verifyAuthToken from "../services/verifyAuth";

const userRouter = Router();

userRouter.get('/', verifyAuthToken, getAllUsers);
userRouter.get('/:id', verifyAuthToken, getUser);

export default userRouter;

