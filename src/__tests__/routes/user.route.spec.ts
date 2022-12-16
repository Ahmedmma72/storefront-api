import supertest from 'supertest';
import app from '../../app';
import client from '../../config/db/db';

const request = supertest(app);
let token: string;

describe('user route', () => {
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
    password: 'ahmed',
  };
  beforeAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM users;
            ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
    const response = await request 
      .post('/api/signup')
      .set('content-type', 'application/json')
      .send(user1);
    token = response.body.token;
    await request
      .post('/api/signup')
      .set('content-type', 'application/json')
      .send(user2);
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM users;
            ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });
  it('should get all users', async () => {
    const response = await request
      .get('/api/user')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    const { message, users } = response.body;
    expect(message).toBe('All users');
    expect(users.length).toBe(2);
  });
  it('should get a user', async () => {
    const response = await request
      .get('/api/user/1')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    const { message, user } = response.body;
    expect(message).toBe('User');
    expect(user.id).toBe(1);
  });
  it('should fail because there is no token', async () => {
    const response = await request
      .get('/api/user/1')
      .set('content-type', 'application/json');
    expect(response.status).toBe(401);
    const { error } = response.body;
    expect(error).toBe('No authorization header');
  });
});
