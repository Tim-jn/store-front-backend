import { User, UserStore } from "../../models/users";

const store = new UserStore();

describe("User Model", () => {
  beforeAll(async () => {
    await store.create({
      first_name: "FirstName",
      last_name: "LastName",
      password: "password",
    });
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

  it("create method should add a user", async () => {
    const user = await store.create({
      first_name: "FirstName",
      last_name: "LastName",
      password: "password",
    });

    expect(user).toEqual({
      id: jasmine.any(Number),
      first_name: "FirstName",
      last_name: "LastName",
      password: jasmine.any(String),
    });
  });

  it("index method should return a list of users", async () => {
    const users = await store.index();

    expect(users[0].first_name).toEqual("FirstName");
    expect(users[0].last_name).toEqual("LastName");
  });

  it("show method should return the correct user", async () => {
    const user = await store.show("1");

    expect(user.first_name).toEqual("FirstName");
    expect(user.last_name).toEqual("LastName");
  });

  it("delete method should remove the user", async () => {
    store.delete("1");
    const user = await store.index();

    expect(user).toEqual([]);
  });

  afterAll(async () => {
    await store.deleteAll();
  });
});
