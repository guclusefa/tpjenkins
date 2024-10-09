const request = require("supertest");
const app = require("../server");
const User = require("../models/user");

jest.mock("../models/user");

describe("GET /users", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all users", async () => {
    User.getUsers.mockImplementation((callback) => {
      callback(null, [
        { id: 1, username: "user1" },
        { id: 2, username: "user2" },
      ]);
    });

    const getUser = await request(app).get("/users");
    expect(getUser.status).toBe(200);
    expect(getUser.body).toEqual([
      { id: 1, username: "user1" },
      { id: 2, username: "user2" },
    ]);
  });
});

describe("POST /users/add", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    User.createUser.mockImplementation((user, callback) => {
      callback(null, { insertId: 1 });
    });

    const newUser = { username: "newUser" };

    const response = await request(app).post("/users/add").send(newUser);

    expect(response.status).toBe(201);
    expect(response.text).toBe("User added successfully");
    expect(User.createUser).toHaveBeenCalledWith(newUser, expect.any(Function));
  });

  it("should return 409 if username already exists", async () => {
    User.createUser.mockImplementation((user, callback) => {
      const error = { code: "ER_DUP_ENTRY" };
      callback(error, null);
    });

    const duplicateUser = { username: "existingUser" };

    const response = await request(app).post("/users/add").send(duplicateUser);

    expect(response.status).toBe(409);
    expect(response.text).toBe("Username already exists");
    expect(User.createUser).toHaveBeenCalledWith(
      duplicateUser,
      expect.any(Function),
    );
  });
});
