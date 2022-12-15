import client from '../../../config/db/db';
import { cart } from '../../../api/models/types/cart';

const addToUserCart = async (c: cart) => {
  try {
    const conn = await client.connect();
    const sql =
      'INSERT INTO cart (user_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
    const result = await conn.query(sql, [c.user_id, c.product_id, c.quantity]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`Could not add to cart ${c.user_id}. Error: ${err}`);
  }
};

export default addToUserCart;
