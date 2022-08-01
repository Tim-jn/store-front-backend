import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import jwt from "jsonwebtoken";

export const store = new UserStore();

// Index route

const index = async (_req: Request, res: Response) => {
  const user = await store.index();
  res.json(user);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }

  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const usersRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

export default usersRoutes;
