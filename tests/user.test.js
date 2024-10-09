const {
  getUsers,
  createUser,
  listUsersWithoutGroup
} = require("../controllers/userController");
const User = require("../models/user");

jest.mock("../models/user");

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      redirect: jest.fn()
    };
  });

  describe("getUsers", () => {
    it("should return users successfully", async () => {
      const mockUsers = [{ id: 1, username: "user1" }, { id: 2, username: "user2" }];
      User.getUsers.mockImplementation((callback) => callback(null, mockUsers));

      await getUsers(req, res);

      expect(User.getUsers).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(mockUsers);
    });

    it("should handle error during fetching users", async () => {
      User.getUsers.mockImplementation((callback) => callback(new Error("Error")));

      await getUsers(req, res);

      expect(User.getUsers).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      req.body.username = "newUser";
      User.createUser.mockImplementation((user, callback) => callback(null));

      await createUser(req, res);

      expect(User.createUser).toHaveBeenCalledWith({ username: "newUser" }, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith("User added successfully");
    });

    it("should handle duplicate username error", async () => {
      req.body.username = "existingUser";
      const duplicateError = { code: "ER_DUP_ENTRY" };
      User.createUser.mockImplementation((user, callback) => callback(duplicateError));

      await createUser(req, res);

      expect(User.createUser).toHaveBeenCalledWith({ username: "existingUser" }, expect.any(Function));
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith("Username already exists");
    });

    it("should handle other errors during user creation", async () => {
      req.body.username = "newUser";
      User.createUser.mockImplementation((user, callback) => callback(new Error("Error")));

      await createUser(req, res);

      expect(User.createUser).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  describe("listUsersWithoutGroup", () => {
    it("should return users without a group", async () => {
      const mockUsers = [{ id: 1, username: "user1" }];
      User.getUsersWithoutGroup.mockImplementation((callback) => callback(null, mockUsers));

      await listUsersWithoutGroup(req, res);

      expect(User.getUsersWithoutGroup).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it("should handle error during fetching users without a group", async () => {
      User.getUsersWithoutGroup.mockImplementation((callback) => callback(new Error("Error")));

      await listUsersWithoutGroup(req, res);

      expect(User.getUsersWithoutGroup).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to retrieve users",
        details: new Error("Error")
      });
    });
  });
});
