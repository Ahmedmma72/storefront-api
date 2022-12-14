import client from '../../config/db/db';
import { user } from './types/user';

export default class User {
  static async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  static async show(id: string): Promise<user> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  static async create(u: user): Promise<user> {
    try {
      const sql =
        'INSERT INTO users (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING id, email, first_name, last_name';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        u.email,
        u.first_name,
        u.last_name,
        u.password,
      ]);
      const book = result.rows[0];
      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
    }
  }
}
