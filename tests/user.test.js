const request = require("supertest");
const app = require("../server");
const User = require("../models/user");

jest.mock("../models/user");

describe("GET /users", () => {
  it("should return all users", async () => {
    User.getUsers.mockImplementation((callback) => {
      callback(null, [{ id: 1, username: "user1" }]);
    });

    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 1, username: "user1" }]);
  }, 30000);
});
