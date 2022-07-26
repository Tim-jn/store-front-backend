// @ts-ignore
import client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const pepper = process.env.BCRYPT_PASSWORD;
      const saltRounds = process.env.SALT_ROUND;

      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hash,
      ]);

      const newUser = result.rows[0];

      conn.release();

      return newUser;
    } catch (err) {
      throw new Error(
        `Could not add new user ${user.first_name}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user
       ${id}. Error: ${err}`);
    }
  }

  // Only used for testing, delete all users and orders

  async deleteAll(): Promise<User[]> {
    try {
      const sql = "TRUNCATE users, orders RESTART IDENTITY";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not delete users. Error: ${err}`);
    }
  }

  async authenticate(authUser: User): Promise<User | null> {
    // @ts-ignore
    const conn = await client.connect();
    const sql =
      "SELECT password FROM users WHERE first_name = ($1) AND last_name = ($2)";

    const result = await conn.query(sql, [
      authUser.first_name,
      authUser.last_name,
    ]);

    conn.release();

    const pepper = process.env.BCRYPT_PASSWORD;

    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(authUser.password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
