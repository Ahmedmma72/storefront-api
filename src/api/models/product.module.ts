import client from '../../config/db/db';
import { product } from './types/product';

export default class Product {
  static async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  static async show(id: number): Promise<product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  static async create(p: product): Promise<product> {
    try {
      const sql =
        'INSERT INTO products ( name, price) values (($1), ($2))RETURNING id,name, price';

      const conn = await client.connect();

      const result = await conn.query(sql, [p.name, p.price]);
      const book = result.rows[0];
      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }
}
