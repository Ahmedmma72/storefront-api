import { Request, Response } from 'express';
import getUserOrdersById from '../services/order/getOrderByUserId';

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      throw new Error('User does not exist');
    }
    const orders = await getUserOrdersById(parseInt(user_id));
    res.status(200).json({ message: 'All orders', orders });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};

export default getUserOrders;


