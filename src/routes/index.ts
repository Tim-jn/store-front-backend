import express from "express";
import { users } from "./api/users";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is the api route.");
});

router.use("/users", users);

export default router;
