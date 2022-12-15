import { Request, Response } from 'express';
import User from '../models/user.model';
import getUserByEmail from '../services/user/getUserByEmail';
import getToken from '../services/getToken';
import hashPassword from '../services/user/hashPasswords';

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    if (!email || !first_name || !last_name || !password) {
      throw new Error('Please provide all required fields');
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    console.log(email, first_name, last_name, password);
    const hashedPassword = hashPassword(password);
    console.log('hashedPassword: ', hashedPassword);
    const user = await User.create({
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: hashedPassword,
    });
    console.log('user: ', user);
    const token = await getToken(user.id as number);
    res.status(200).json({ message: 'User created', user: user, token });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(400).json({ error: typedError?.message });
  }
};

export default signUp;
