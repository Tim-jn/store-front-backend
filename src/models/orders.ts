// @ts-ignore
import client from "../database";

export type Order = {
  id?: number;
  name: string;
  price: number;
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
}
