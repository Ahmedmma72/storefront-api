import supertest from 'supertest';
import app from '../../app';
import client from '../../config/db/db';
import { user } from '../../api/models/types/user';
import { product } from '../../api/models/types/product';
import Product from '../../api/models/product.model';
import Order from '../../api/models/order.model';
import getUserOrdersById from '../../api/services/order/getOrderByUserId';

const request = supertest(app);
let token: string;

describe('cart route', () => {
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
    const sql = `DELETE FROM cart;
        DELETE FROM order_products;
        DELETE FROM orders;
        ALTER SEQUENCE orders_id_seq RESTART WITH 1;
        DELETE FROM products;
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
    const p1 = await Product.create(testProduct1);
    testProduct1.id = p1.id;
    const p2 = await Product.create(testProduct2);
    testProduct2.id = p2.id;
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM cart;
        DELETE FROM order_products;
        DELETE FROM orders;
        ALTER SEQUENCE orders_id_seq RESTART WITH 1;
        DELETE FROM products;
        ALTER SEQUENCE products_id_seq RESTART WITH 1;
        DELETE FROM users;
        ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });
  it('should add a product to the cart', async () => {
    const response = await request
      .post('/api/cart')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product_id: testProduct1.id,
        user_id: testUser.id,
        quantity: 1,
      });
    expect(response.status).toBe(201);
    const { message, cart } = response.body;
    expect(message).toBe('Product added to cart');
    expect(cart.product_id).toBe(testProduct1.id);
    expect(cart.user_id).toBe(testUser.id);
  });
  it('should get all products in the cart', async () => {
    const response = await request
      .get('/api/cart')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: testUser.id });
    expect(response.status).toBe(200);
    const { cart } = response.body;
    expect(cart.length).toBe(1);
    expect(cart[0].product_id).toBe(testProduct1.id);
    expect(cart[0].quantity).toBe(1);
  });
  it('should update the quantity of a product in the cart', async () => {
    const response = await request
      .put('/api/cart')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product_id: testProduct1.id,
        user_id: testUser.id,
        quantity: 2,
      });
    expect(response.status).toBe(200);
    const { message, cart } = response.body;
    expect(message).toBe('Cart updated');
    expect(cart.product_id).toBe(testProduct1.id);
    expect(cart.user_id).toBe(testUser.id);
    expect(cart.quantity).toBe(2);
  });
  it('should delete a product from the cart', async () => {
    await request
      .post('/api/cart')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product_id: testProduct2.id,
        user_id: testUser.id,
        quantity: 1,
      });
    const response = await request
      .delete('/api/cart')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product_id: testProduct2.id,
        user_id: testUser.id,
      });
    expect(response.status).toBe(200);
    const { message, cart } = response.body;
    expect(message).toBe('Product deleted from cart');
    expect(cart.product_id).toBe(testProduct2.id);
    expect(cart.user_id).toBe(testUser.id);
  });
  it('should delete all products from the cart after check out and a new order is created', async () => {
    const response = await request
      .post('/api/cart/checkout')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: testUser.id });

    expect(response.status).toBe(200);
    const { message, cart } = response.body;
    expect(message).toBe('Cart checked out');
    expect(cart.user_id).toBe(testUser.id);
    const order = await getUserOrdersById(testUser.id as number);
    expect(order.length).toBe(1);
    expect(order[0].user_id).toBe(testUser.id);
    expect(order[0].status).toBe('completed');
  });
});
