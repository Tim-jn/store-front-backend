import { Product, ProductStore } from "../models/products";

const store = new ProductStore();

describe("Product Model", () => {
  let newProduct = {
    name: "TV",
    price: 150,
  };

  beforeEach(async () => {
    await store.create(newProduct);
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a product", async () => {
    const product = await store.create(newProduct);

    expect(product).toEqual({
      id: 2,
      name: "TV",
      price: 150,
    });
  });

  it("index method should return a list of products", async () => {
    const products = await store.index();

    expect(products).toEqual([
      {
        id: 1,
        name: "TV",
        price: 150,
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const product = await store.show("1");

    expect(product).toEqual({
      id: 1,
      name: "TV",
      price: 150,
    });
  });

  it("delete method should remove the product", async () => {
    store.delete("1");
    const product = await store.index();

    expect(product).toEqual([]);
  });

  afterEach(async () => {
    await store.deleteAll();
  });
});
