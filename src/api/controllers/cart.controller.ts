import { Request, Response } from 'express';
import Cart from '../models/cart.model';

import addToUserCart from '../services/cart/addToUserCart';
import cartCheckout from '../services/cart/cartCheckout';
import getUserCartProducts from '../services/cart/getUserCartProducts';
import addOrderProducts from '../services/order/addOrderProduct';
import Order from '../models/order.model';


import updateUserCartProduct from '../services/cart/updateUserCartProduct';

export const getCartProducts = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      throw new Error('Please provide a user_id');
    }
    const cart = await getUserCartProducts(parseInt(user_id));
    res.status(200).json({message:'cart', cart});
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id || !product_id || !quantity) {
      throw new Error('Please provide a user_id, product_id, and quantity');
    }
    const cart = await addToUserCart({
      user_id: parseInt(user_id),
      product_id: parseInt(product_id),
      quantity: parseInt(quantity),
    });
    res.status(201).json({message: 'Product added to cart', cart});
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};

export const updateCartProduct = async (req: Request, res: Response) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id || !product_id || !quantity) {
      throw new Error('Please provide a user_id, product_id, and quantity');
    }
    const cart = await updateUserCartProduct({
      user_id: parseInt(user_id),
      product_id: parseInt(product_id),
      quantity: parseInt(quantity),
    });
    res.status(200).json({message: 'Cart updated', cart});
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};

export const checkoutCart = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      throw new Error('Please provide a user_id');
    }
    const products = await getUserCartProducts(parseInt(user_id));
    if (products.length === 0) {
      throw new Error('Cart is empty');
    }
    const { id: ID } = await Order.create({
      user_id: parseInt(user_id),
      status: 'completed',
    });
    await addOrderProducts(ID as number, products);

    const cart = await cartCheckout(parseInt(user_id));
    res.status(200).json({message: 'Cart checked out', cart});
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};

export const deleteProductFromCart = async (req: Request, res: Response) => {
  try {
    const { user_id, product_id } = req.body;
    if (!user_id || !product_id) {
      throw new Error('Please provide a user_id and product_id');
    }
    const cart = await Cart.delete({
      user_id: parseInt(user_id),
      product_id: parseInt(product_id),
    });
    res.status(200).json({message: 'Product deleted from cart', cart});
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};
