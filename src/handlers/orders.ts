import express, { Request, Response } from "express";
import { Order, OrdersStore } from "../models/orders";
import verifyAuthToken from "../middlewares/verifyAuthToken";

export const store = new OrdersStore();

const show = async (req: Request, res: Response) => {
  try {
    const orders = await store.show(req.body.id as number);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders/:id", verifyAuthToken, show);
};

export default orderRoutes;
