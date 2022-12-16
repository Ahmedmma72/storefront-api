import supertest from 'supertest';
import app from '../../app';
import client from '../../config/db/db';
import Order from '../../api/models/order.model';
import { user } from '../../api/models/types/user';

const request = supertest(app);
let token: string;

describe('order route', () => {
  const testUser: user = {
    first_name: 'ahmed',
    last_name: 'ahmed',
    email: 'ahmed@ahmed.com',
    password: 'ahmed',
  };
  const testOrder1 = {
    user_id: 1,
    status: 'completed',
  };
  const testOrder2 = {
    user_id: 1,
    status: 'active',
  };
  beforeAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM orders;
            ALTER SEQUENCE orders_id_seq RESTART WITH 1;
            DELETE FROM users;
            ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
    const response = await request
      .post('/api/signup')
      .set('content-type', 'application/json')
      .send(testUser);
    token = response.body.token;
    testUser.id = response.body.user.id;
    await Order.create(testOrder1);
    await Order.create(testOrder2);
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM orders;
            ALTER SEQUENCE orders_id_seq RESTART WITH 1;
            DELETE FROM users;
            ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });
  it('should get all orders', async () => {
    const response = await request
      .get('/api/order')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({user_id: testUser.id});
    expect(response.status).toBe(200);
    const { message, orders } = response.body;
    expect(message).toBe('All orders');
    expect(orders.length).toBe(2);
  });
  it('should not return orders because user is not authenticated', async () => {
    const response = await request
      .get('/api/order')
      .set('content-type', 'application/json');
    expect(response.status).toBe(401);
    const { error } = response.body;
    expect(error).toBe('No authorization header');
  });

});
