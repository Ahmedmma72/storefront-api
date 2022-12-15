import { Router } from 'express';
import signUp from '../controllers/signup.controller';

const signUpRouter = Router();

signUpRouter.post('/', signUp);

export default signUpRouter;
