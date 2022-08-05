import { Order, OrderProducts, OrdersStore } from "../models/orders";
import { User, UserStore } from "../models/users";
import { Product, ProductStore } from "../models/products";

const store = new OrdersStore();
const Productstore = new ProductStore();
const Userstore = new UserStore();

describe("Order Model", () => {
  beforeEach(async () => {
    await Userstore.create({
      first_name: "FirstName",
      last_name: "LastName",
      password: "password",
    });

    await Productstore.create({
      name: "TV",
      price: 150,
    });
  });

  it("create method should create an order and show method should return the order", async () => {
    await store.create({
      user_id: 1,
      status: "active",
    });

    const order = await store.show(1);

    expect(order).toContain({
      id: 1,
      status: "active",
      user_id: 1,
    });
  });

  afterEach(async () => {
    await Productstore.deleteAll();
    await Userstore.deleteAll();
  });
});
