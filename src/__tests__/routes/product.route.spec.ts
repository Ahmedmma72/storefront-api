import { product } from './../../api/models/types/product.d';
import supertest from 'supertest';
import { user } from '../../api/models/types/user';
import app from '../../app';
import client from '../../config/db/db';
import Product from '../../api/models/product.model';

const request = supertest(app);
let token: string;

describe('product route', () => {
  const testUser: user = {
    first_name: 'ahmed',
    last_name: 'ahmed',
    email: 'ahmed@ahmed.com',
    password: 'ahmed',
  };
  const testProduct1: product = {
    name: 'test product 1',
    price: 10,
  };
  const testProduct2: product = {
    name: 'test product 2',
    price: 20,
  };
  beforeAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM products;
                ALTER SEQUENCE products_id_seq RESTART WITH 1;
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
    await Product.create(testProduct1);
    await Product.create(testProduct2);
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM products;
                ALTER SEQUENCE products_id_seq RESTART WITH 1;
                DELETE FROM users;
                ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });
  it('should get all products given that the user is logged in', async () => {
    const response = await request
      .get('/api/product')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    const { message, products } = response.body;
    expect(message).toBe('All products');
    expect(products.length).toBe(2);
  });
  it('should get all products even when the user is not logged in', async () => {
    const response = await request
      .get('/api/product')
      .set('content-type', 'application/json');
    expect(response.status).toBe(200);
    const { message, products } = response.body;
    expect(message).toBe('All products');
    expect(products.length).toBe(2);
  });
  it('should get a product by id', async () => {
    const response = await request
      .get('/api/product/1')
      .set('content-type', 'application/json');

    expect(response.status).toBe(200);
    const { message, product } = response.body;
    expect(message).toBe('Product');
    expect(product.name).toBe('test product 1');
  });
  it('should not return a product by if the product does not exist', async () => {
    const response = await request
      .get('/api/product/3')
      .set('content-type', 'application/json');
    expect(response.status).toBe(400);
    const { error } = response.body;
    expect(error).toBe('Product does not exist');
  });
  it('should add a product', async () => {
    const response = await request
      .post('/api/product')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test product 3', price: 30 });
    expect(response.status).toBe(201);
    const { message, product } = response.body;
    expect(message).toBe('Product added');
    expect(product.name).toBe('test product 3');
  });
  it('should not add a product if the user is not logged in', async () => {
    const response = await request
      .post('/api/product')
      .set('content-type', 'application/json')
      .send({ name: 'test product 3', price: 30 });
    expect(response.status).toBe(401);
    const { error } = response.body;
    expect(error).toBe('No authorization header');
  });
});
