import client from "../../../config/db/db";

const getUserByEmail = async (email: string) => {
    try {
        const sql = 'SELECT * FROM users WHERE email=($1)';
        const conn = await client.connect();
        const result = await conn.query(sql, [email]);

        conn.release();
        return result.rows[0];
    } catch (err) {
        throw new Error(`Could not find user ${email}. Error: ${err}`);
    }
};

export default getUserByEmail;