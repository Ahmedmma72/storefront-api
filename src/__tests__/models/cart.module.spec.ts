import { cart } from './../../api/models/types/cart.d';
import { order } from './../../api/models/types/order';
import client from '../../config/db/db';
import { product } from '../../api/models/types/product';
import Product from '../../api/models/product.model';
import User from '../../api/models/user.model';
import { user } from '../../api/models/types/user';
import Order from '../../api/models/order.model';
import addToUserCart from '../../api/services/cart/addToUserCart';
import getUserCartProducts from '../../api/services/cart/getUserCartProducts';
import updateUserCartProduct from '../../api/services/cart/updateUserCartProduct';
import cartCheckout from '../../api/services/cart/cartCheckout';

describe('cart module', () => {
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

    const testUser = await User.create(user);
    user.id = testUser.id;
    //console.log(user);
    const testProduct1 = await Product.create(product1);
    product1.id = testProduct1.id;
    //console.log(product1);
    const testProduct2 = await Product.create(product2);
    product2.id = testProduct2.id;
    //console.log(product2);
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
  let cart1: cart;
  let cart2: cart;
  it('should add a product to the cart', async () => {
    cart1 = {
      user_id: user.id,
      product_id: product1.id,
      quantity: 1,
    };
    cart2 = {
      user_id: user.id,
      product_id: product2.id,
      quantity: 1,
    };
    const testCart1 = await addToUserCart(cart1);
    expect(testCart1).toEqual(cart1);
    const testCart2 = await addToUserCart(cart2);
    expect(testCart2).toEqual(cart2);
  });
  it('should get products in the cart of the test user', async () => {
    const products = await getUserCartProducts(user.id as number);
    expect(products).toEqual([
      {
        product_id: product1.id,
        quantity: 1,
      },
      {
        product_id: product2.id,
        quantity: 1,
      },
    ]);
  });
  it('should update the quantity of product1 in the cart of the test user', async () => {
    cart1.quantity = 2;
    const testCart1 = await updateUserCartProduct(cart1);
    expect(testCart1).toEqual(cart1);
  });
  it('should check out the user cart', async ()=>{
    await cartCheckout(user.id as number);
    const products = await getUserCartProducts(user.id as number);
    expect(products).toEqual([]);
  });

});
