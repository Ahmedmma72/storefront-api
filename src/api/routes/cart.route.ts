import {Router} from 'express';
import {getCartProducts, addProductToCart, updateCartProduct, checkoutCart, deleteProductFromCart} from '../controllers/cart.controller';
import verifyAuthToken from '../services/verifyAuth';

const cartRouter = Router();

cartRouter.get('/', verifyAuthToken, getCartProducts);
cartRouter.post('/', verifyAuthToken, addProductToCart);
cartRouter.put('/', verifyAuthToken, updateCartProduct);
cartRouter.delete('/', verifyAuthToken, deleteProductFromCart);
cartRouter.post('/checkout', verifyAuthToken, checkoutCart);

export default cartRouter;


