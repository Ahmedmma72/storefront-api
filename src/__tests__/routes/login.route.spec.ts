import app from '../../app';
import supertest from 'supertest';
import client from '../../config/db/db';

const request = supertest(app);

describe('login route', () => {
  const testUser = {
    first_name: 'ahmed',
    last_name: 'ahmed',
    email: 'ahmed@ahmed.com',
    password: 'ahmed',
  };
  beforeAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM users;
    ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
    await request
      .post('/api/signup')
      .set('content-type', 'application/json')
      .send(testUser);
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM users;
    ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });
  it('should login successfully', async () => {
    const response = await request
      .post('/api/login')
      .set('content-type', 'application/json')
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    expect(response.status).toBe(200);
    const { message, user, token } = response.body;
    expect(message).toBe('User logged in');
    expect(user.email).toBe(user.email);
    expect(token).toBeTruthy();
  });
  it('should fail to login because of a missing parameter', async () => {
    const response = await request
      .post('/api/login')
      .set('content-type', 'application/json')
      .send({
        email: testUser.email,
      });
    expect(response.status).toBe(400);
    const { error } = response.body;
    expect(error).toBe('Please provide all required fields');
  });
  it('should fail to login because of a wrong password', async () => {
    const response = await request
      .post('/api/login')
      .set('content-type', 'application/json')
      .send({
        email: testUser.email,
        password: 'wrong password',
      });
    expect(response.status).toBe(400);
    const { error } = response.body;
    expect(error).toBe('Incorrect password');
  });
  it('should fail to login because of a wrong email', async () => {
    const response = await request
      .post('/api/login')
      .set('content-type', 'application/json')
      .send({
        email: 'wrong email',
        password: testUser.password,
      });
    expect(response.status).toBe(400);
    const { error } = response.body;
    expect(error).toBe('User does not exist');
  });
});
