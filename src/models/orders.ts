// @ts-ignore
import client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProducts = {
  id?: number;
  product_id: number;
  quantity: number;
  order_id: number;
};

export class OrdersStore {
  async show(user_id: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const result = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();

      const sql = `INSERT INTO orders (user_id, status) VALUES ($1, $2)`;
      const result = await conn.query(sql, [order.user_id, order.status]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order ${err}`);
    }
  }

  async addOrder(order: OrderProducts): Promise<Order> {
    try {
      const conn = await client.connect();

      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3)`;
      const result = await conn.query(sql, [
        order.quantity,
        order.order_id,
        order.product_id,
      ]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add order ${err}`);
    }
  }
}
