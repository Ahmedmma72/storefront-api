import { cart } from './models/types/cart.d';
import  {Router} from 'express';
import cartRouter from './routes/cart.route';
import productRouter from './routes/product.route';
import orderRouter from './routes/order.route';
import userRouter from './routes/user.route';
import LogInRouter from './routes/login.route';
import signUpRouter from './routes/signup';



const router = Router();

router.use('/cart', cartRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);
router.use('/user', userRouter);
router.use('/login', LogInRouter);
router.use('/signup', signUpRouter);


export default router;
