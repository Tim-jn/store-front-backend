import { User, UserStore } from "../../models/users";

const store = new UserStore();

describe("User Model", () => {
  let newUser = {
    first_name: "FirstName",
    last_name: "LastName",
    password: "password",
  };

  beforeEach(async () => {
    await store.create(newUser);
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
    const user = await store.create(newUser);

    expect(user).toEqual({
      id: 2,
      first_name: "FirstName",
      last_name: "LastName",
      password: jasmine.any(String),
    });
  });

  it("index method should return a list of users", async () => {
    const users = await store.index();

    expect(users).toEqual([
      {
        id: 1,
        first_name: "FirstName",
        last_name: "LastName",
        password: jasmine.any(String),
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const user = await store.show("1");

    expect(user).toEqual({
      id: 1,
      first_name: "FirstName",
      last_name: "LastName",
      password: jasmine.any(String),
    });
  });

  it("delete method should remove the user", async () => {
    store.delete("1");
    const user = await store.index();

    expect(user).toEqual([]);
  });

  afterEach(async () => {
    await store.deleteAll();
  });
});
