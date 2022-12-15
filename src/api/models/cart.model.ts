import client from '../../config/db/db';
import { cart } from './types/cart';

export default class Cart {
  static async index(): Promise<cart[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM cart';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get cart. Error: ${err}`);
    }
  }

  static async show(id: string): Promise<cart> {
    try {
      const sql = 'SELECT * FROM cart WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find cart ${id}. Error: ${err}`);
    }
  }

  static async create(c: cart): Promise<cart> {
    try {
      const sql =
        'INSERT INTO cart ( user_id, product_id, quantity) values (($1), ($2), ($3))RETURNING id,user_id, product_id, quantity';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        c.user_id,
        c.product_id,
        c.quantity,
      ]);
      const cart = result.rows[0];
      conn.release();

      return cart;
    } catch (err) {
      throw new Error(`Could not add new cart ${c.user_id}. Error: ${err}`);
    }
  }
  static async delete(c: cart): Promise<cart> {
    try {
      const sql = 'DELETE FROM cart WHERE user_id=($1) AND product_id=($2)';
      const conn = await client.connect();
      const result = await conn.query(sql, [c.user_id, c.product_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find cart ${c.product_id}. Error: ${err}`);
    }
  }
}
