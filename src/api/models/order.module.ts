import client from '../../config/db/db';
import { order } from './types/order';

export default class Order {
  static async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  static async show(id: number): Promise<order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  static async create(o: order): Promise<order> {
    try {
      const sql =
        'INSERT INTO orders ( user_id, status) values (($1), ($2))RETURNING id,user_id, status';

      const conn = await client.connect();

      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${o.user_id}. Error: ${err}`);
    }
  }
}
