import { order } from './../../api/models/types/order';
import client from '../../config/db/db';
import { product } from '../../api/models/types/product';
import Product from '../../api/models/product.model';
import User from '../../api/models/user.model';
import { user } from '../../api/models/types/user';
import Order from '../../api/models/order.model';

describe('Order Module', () => {
  const product1: product = {
    name: 'product1',
    price: 10,
  };
  const product2: product = {
    name: 'product2',
    price: 20,
  };

  const user: user = {
    email: 'ahmed@ahmed.com',
    first_name: 'ahmed',
    last_name: 'ahmed',
    password: 'ahmed',
  };
  beforeAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM orders;
        ALTER SEQUENCE orders_id_seq RESTART WITH 1;
        DELETE FROM products;
        ALTER SEQUENCE products_id_seq RESTART WITH 1;
        DELETE FROM users;
        ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();

    const testUser = await User.create(user);
    user.id = testUser.id;
    //console.log(user);
    const testProduct1 = await Product.create(product1);
    product1.id = testProduct1.id;
    //console.log(product1);
    const testProduct2 = await Product.create(product2);

    product2.id = testProduct2.id;
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql = `DELETE FROM orders;
        ALTER SEQUENCE orders_id_seq RESTART WITH 1;
        DELETE FROM products;
        ALTER SEQUENCE products_id_seq RESTART WITH 1;
        DELETE FROM users;
        ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });
  let order1: order;
  let order2: order;
  it('it should create two orders', async () => {
    const testOrder1 = {
      user_id: user.id,
      status: 'active',
    };
    const testOrder2 = {
      user_id: user.id,
      status: 'completed',
    };
    order1 = await Order.create(testOrder1);
    order2 = await Order.create(testOrder2);
    expect(order1).toEqual({
      id: 1,
      user_id: testOrder1.user_id,
      status: testOrder1.status,
    });
    expect(order2).toEqual({
      id: 2,
      user_id: testOrder2.user_id,
      status: testOrder2.status,
    });
  });
  it('returns all orders', async () => {
    const orders = await Order.index();
    expect(orders).toEqual([
      {
        id: 1,
        user_id: order1.user_id,
        status: order1.status,
      },
      {
        id: 2,
        user_id: order2.user_id,
        status: order2.status,
      },
    ]);
  });
  it('returns a single order', async () => {
    const order = await Order.show(1);
    expect(order).toEqual({
      id: 1,
      user_id: order1.user_id,
      status: order1.status,
    });
  });
});
