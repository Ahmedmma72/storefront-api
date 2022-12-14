import client from '../../../config/db/db';
import { order_product } from '../../models/types/order';

const addOrderProducts = async (
  order_id: number,
  products: order_product[]
) => {
  try {
    const conn = await client.connect();
    products.forEach(async product => {
      const sql =
        'INSERT INTO order_products ( order_id, product_id, quantity) values (($1), ($2), ($3))';
      const result = await conn.query(sql, [
        order_id,
        product.product_id,
        product.quantity,
      ]);
    });
    conn.release();
  } catch (err) {
    throw new Error(`Could not add new order ${order_id}. Error: ${err}`);
  }
};

export default addOrderProducts;
