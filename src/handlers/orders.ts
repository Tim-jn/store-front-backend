import express, { Request, Response } from "express";
import { Order, OrdersStore } from "../models/orders";
import verifyAuthToken from "../middlewares/verifyAuthToken";

export const store = new OrdersStore();

const show = async (req: Request, res: Response) => {
  try {
    const orders = await store.show(req.body.user_id as number);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addOrders = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      status: req.body.status,
    };

    const newOrder = await store.addOrder(order);

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders/:id/products", verifyAuthToken, addOrders);
};

export default orderRoutes;
