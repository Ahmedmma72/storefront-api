import client from '../../config/db/db';
import { user } from '../../api/models/types/user';
import User from '../../api/models/user.model';

describe('User Model', () => {
  beforeAll(async () => {
    const sql = `DELETE FROM users; 
      ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    const conn = await client.connect();
    await conn.query(sql);
    conn.release();
  });
  afterAll(async () => {
    const sql = `DELETE FROM users;
      ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    const conn = await client.connect();
    await conn.query(sql);
    conn.release();
  });
  const testUser1 = {
    email: 'ahmed@ahmed.com',
    first_name: 'ahmed',
    last_name: 'ahmed',
    password: 'ahmed',
  };
  const testUser2 = {
    email: 'ahmed2@ahmed.com',
    first_name: 'ahmed2',
    last_name: 'ahmed2',
    password: 'ahmed2',
  };
  let user1: user;
  let user2: user;
  it('creates two users', async () => {
    user1 = await User.create(testUser1);
    user2 = await User.create(testUser2);
    expect(user1).toEqual({
      id: 1,
      email: testUser1.email,
      first_name: testUser1.first_name,
      last_name: testUser1.last_name,
    });
    expect(user2).toEqual({
      id: 2,
      email: testUser2.email,
      first_name: testUser2.first_name,
      last_name: testUser2.last_name,
    });
  });

  it('gets all users', async () => {
    const result = await User.index();
    expect(result).toEqual([
      {
        id: 1,
        email: testUser1.email,
        first_name: testUser1.first_name,
        last_name: testUser1.last_name,
        password: testUser1.password,
      },
      {
        id: 2,
        email: testUser2.email,
        first_name: testUser2.first_name,
        last_name: testUser2.last_name,
        password: testUser2.password,
      },
    ]);
  });
  it('gets a user by id', async () => {
    const result = await User.show(1);
    expect(result).toEqual({
      id: 1,
      email: testUser1.email,
      first_name: testUser1.first_name,
      last_name: testUser1.last_name,
      password: testUser1.password,
    });
  });
});
