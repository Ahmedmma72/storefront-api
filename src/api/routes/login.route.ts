import { Router } from "express";
import logIn from "../controllers/logIn.controller";

const LogInRouter = Router();

LogInRouter.post('/', logIn);

export default LogInRouter;
