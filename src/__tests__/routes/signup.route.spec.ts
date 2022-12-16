import supertest from 'supertest';
import app from '../../app';
import client from '../../config/db/db';
import getUserByEmail from '../../api/services/user/getUserByEmail';

const request = supertest(app);

describe('signup route', () => {
  const user1 = {
    first_name: 'ahmed',
    last_name: 'ahmed',
    email: 'ahmed@ahmed.com',
    password: 'ahmed',
  };
  const user2 = {
    first_name: 'ahmed',
    last_name: 'ahmed',
    email: 'ahmed2@ahmed.com',
  };
  beforeAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM users;
            ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM users;
            ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });
  it('should signup with no problems', async () => {
    const response = await request
      .post('/api/signup')
      .set('content-type', 'application/json')
      .send(user1);
    expect(response.status).toBe(201);
    const { message, user, token } = response.body;
    expect(message).toBe('User created');
    expect(user.email).toBe(user1.email);
    expect(token).toBeTruthy();
  });
  it('should not signup because of a messing parameter', async () => {
    const response = await request
      .post('/api/signup')
      .set('content-type', 'application/json')
      .send(user2);
    expect(response.status).toBe(400);
    const { error } = response.body;
    expect(error).toBe('Please provide all required fields');
    const user = await getUserByEmail(user2.email);
    expect(user).toBeUndefined();
  });
  it('should fail to sign up because user email already exists', async () => {
    const response = await request
      .post('/api/signup')
      .set('content-type', 'application/json')
      .send(user1);
      expect(response.status).toBe(400);
      const {error} = response.body;
      expect(error).toBe('User already exists');
  });
});
