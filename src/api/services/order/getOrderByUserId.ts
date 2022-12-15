
import client from "../../../config/db/db";

const getUserOrdersById = async (user_id: number) => {
    try {
        const conn = await client.connect();
        const sql = 'SELECT * FROM orders WHERE user_id=($1)';
        const result = await conn.query(sql, [user_id]);
        conn.release();
        return result.rows;
    } catch (err) {
        throw new Error(`Could not find orders for user ${user_id}. Error: ${err}`);
    }
};

export default getUserOrdersById;
