import { Request, Response } from 'express';
import User from '../models/user.module';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.index();
    res.status(200).json({ message: 'All users', users });
  } catch (err: unknown) {
    res.status(400).json({ error: err as Error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error('User does not exist');
    }
    const user = await User.show(parseInt(id));
    if (!user) {
      throw new Error('User does not exist');
    }
    res.status(200).json({ message: 'User', user });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json(typedError?.message);
  }
};
