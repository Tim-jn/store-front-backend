// @ts-ignore
import client from "../database";

export type Order = {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrdersStore {
  async show(id: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async addOrder(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();

      const sql = `INSERT INTO orders (quantity, user_id, product_id, status) VALUES ($1, $2, $3, $4)`;
      const result = await conn.query(sql, [
        order.quantity,
        order.user_id,
        order.product_id,
        order.status,
      ]);
      
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add order ${err}`);
    }
  }
}
