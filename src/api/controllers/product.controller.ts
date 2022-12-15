import { Request, Response } from 'express';
import Product from '../models/product.module';
import getProductByName from '../services/product/getProductByName';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.index();
    res.status(200).json({ message: 'All products', products });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error('Product does not exist');
    }
    const product = await Product.show(parseInt(id));
    if (!product) {
      throw new Error('Product does not exist');
    }
    res.status(200).json({ message: 'Product', product });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      throw new Error('Product does not exist');
    }
    const productExists = await getProductByName(name);
    if (productExists) {
      throw new Error('Product already exists');
    }
    const product = await Product.create({ name, price });
    res.status(201).json({ message: 'Product added', product });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};
