import { Order, OrdersStore } from "../models/orders";
import { User, UserStore } from "../models/users";
import { Product, ProductStore } from "../models/products";

const store = new OrdersStore();
const Productstore = new ProductStore();
const Userstore = new UserStore();

describe("Order Model", () => {
  beforeAll(async () => {
    await Userstore.create({
      first_name: "FirstName",
      last_name: "LastName",
      password: "password",
    });

    await Productstore.create({
      name: "TV",
      price: 150,
    });

    await store.addOrder({
      user_id: 1,
      product_id: 1,
      quantity: 1,
      status: "active",
    });
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("show method should return the correct order", async () => {
    const order = await store.show(1); 

    const newOrder: any = [{
      id: 1,
      product_id: 1,
      quantity: 1,
      user_id: 1,
      status: "active",
    }];

    expect(order).toEqual(newOrder);
  });

  afterAll(async () => {
    await Productstore.deleteAll();
    await Userstore.deleteAll();
  });
});
