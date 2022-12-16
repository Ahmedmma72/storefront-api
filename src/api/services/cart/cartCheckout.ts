import client from '../../../config/db/db';

const cartCheckout = async (user_id: number) => {
  try {
    const conn = await client.connect();
    const sql = 'DELETE FROM cart WHERE user_id=($1) RETURNING *';
    const result = await conn.query(sql, [user_id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`Could not find cart ${user_id}. Error: ${err}`);
  }
};

export default cartCheckout;
