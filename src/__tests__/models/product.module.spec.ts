
import client from '../../config/db/db';
import { product } from '../../api/models/types/product';
import Product from '../../api/models/product.model';

beforeAll(async () => {
  try {
    const sql = `DELETE FROM products;
				ALTER SEQUENCE products_id_seq RESTART WITH 1; 
				DELETE from users; 
				ALTER SEQUENCE users_id_seq RESTART WITH 1; 
			`;
    const conn = await client.connect();
    await conn.query(sql);
    conn.release();
  } catch (err) {
    console.log(err);
  }
});
afterAll(async () => {
  try {
    const sql = `DELETE FROM products;
				ALTER SEQUENCE products_id_seq RESTART WITH 1; 
				DELETE from users; 
				ALTER SEQUENCE users_id_seq RESTART WITH 1; 
			`;
    const conn = await client.connect();
    await conn.query(sql);
    conn.release();
  } catch (err) {
    console.log(err);
  }
});

describe('Product Model', () => {
  const testProduct1 = {
    name: 'product1',
    price: 10,
  };
  const testProduct2 = {
    name: 'product2',
    price: 20,
  };
  let product1: product;
  let product2: product;
  it('creates two products', async () => {
    try {
      product1 = await Product.create(testProduct1);
      product2 = await Product.create(testProduct2);
      expect(product1).toEqual({
        id: 1,
        name: testProduct1.name,
        price: testProduct1.price,
      });
      expect(product2).toEqual({
        id: 2,
        name: testProduct2.name,
        price: testProduct2.price,
      });
    } catch (err: unknown) {
      const typedErr = err as Error;
      console.log(typedErr.message);
    }
  });
  it('gets all products', async () => {
    try {
      const products = await Product.index();
      expect(products).toEqual([product1, product2]);
    } catch (err: unknown) {
      const typedErr = err as Error;
      console.log(typedErr.message);
    }
  });
  it('gets one product', async () => {
    try {
      const product = await Product.show(1);
      expect(product).toEqual(product1);
    } catch (err: unknown) {
      const typedErr = err as Error;
      console.log(typedErr.message);
    }
  });
});
