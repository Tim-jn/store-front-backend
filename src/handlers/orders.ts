import express, { Request, Response } from "express";
import { Order, OrderProducts, OrdersStore } from "../models/orders";
import verifyAuthToken from "../middlewares/verifyAuthToken";

export const store = new OrdersStore();

const show = async (req: Request, res: Response) => {
  try {
    const orders = await store.show(parseInt(req.params.id));
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await store.create({
      user_id: req.body.user_id,
      status: req.body.status,
    });

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addOrders = async (req: Request, res: Response) => {
  try {
    const newOrder = await store.addOrder({
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    });

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, createOrder);
  app.post("/orders/:id/products", verifyAuthToken, addOrders);
};

export default orderRoutes;
