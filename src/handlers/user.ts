import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";

export const store = new UserStore();

// Index route

const index = async (_req: Request, res: Response) => {
  const user = await store.index();
  res.json(user);
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
};

export default userRoutes;
