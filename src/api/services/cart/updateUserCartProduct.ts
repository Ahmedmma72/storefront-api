import client from '../../../config/db/db';
import {cart} from '../../../api/models/types/cart';

const updateUserCartProduct = async (c: cart) => {
  try {
    const conn = await client.connect();
    const sql =
      'UPDATE cart SET quantity=($1) WHERE user_id=($2) AND product_id=($3) RETURNING *';
    const result = await conn.query(sql, [c.quantity, c.user_id, c.product_id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`Could not update cart ${c.user_id}. Error: ${err}`);
  }
};

export default updateUserCartProduct;
