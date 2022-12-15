import { Request, Response } from 'express';
import getUserByEmail from '../services/user/getUserByEmail';
import getToken from '../services/getToken';

import authenticateUser from '../services/user/authenticateUser';

const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Please provide all required fields');
    }
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error('User does not exist');
    }
    const correctPassword = await authenticateUser(email, password);
    if (!correctPassword) {
      throw new Error('Incorrect password');
    }
    const token = await getToken(user.id as number);
    res.status(200).json({ message: 'User logged in', user, token });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json({ error: typedError?.message });
  }
};

export default logIn;
