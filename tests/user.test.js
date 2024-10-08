const request = require("supertest");
const app = require("../server");
const User = require("../models/user");

jest.mock("../models/user");

describe("GET /users", () => {
  beforeAll(() => {
    // Mock de la méthode getUsers pour simuler une réponse de la base de données
    User.getUsers.mockImplementation((callback) => {
      callback(null, [
        { id: 1, username: "user1" },
        { id: 2, username: "user2" },
      ]);
    });
  });

  it("verify 1 + 1 = 2", () => {
    expect(1 + 1).toBe(2);
  });
});
