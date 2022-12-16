import client from "../../../config/db/db";

const getProductByName = async (name: string) => {
    try {
        const sql = 'SELECT * FROM products WHERE name=($1)';
        const conn = await client.connect();
        const result = await conn .query(sql, [name]);

        conn.release();
        return result.rows[0];
    } catch (err) {
        throw new Error(`Could not find product ${name}. Error: ${err}`);
    }
};

export default getProductByName;