const {
  connect,
} = require("../controllers/homeController");
const Home = require("../models/home");

jest.mock("../models/home");

describe("Home Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      session: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      render: jest.fn(),
      send: jest.fn(),
      redirect: jest.fn(),
    }
  });

  describe("connect", () => {
    it("should return 400 if pseudo is missing", async () => {
      await connect(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Pseudo requis");
    });

    it("should connect user if pseudo exists", async () => {
      req.body.pseudo = "existingUser";
      Home.checkUsernameExists.mockImplementation((pseudo, callback) =>
        callback(null, true),
      );

      await connect(req, res);

      expect(Home.checkUsernameExists).toHaveBeenCalledWith(
        "existingUser",
        expect.any(Function),
      );
      expect(req.session.user).toEqual({ pseudo: "existingUser" });
      expect(res.redirect).toHaveBeenCalledWith("/users-without-group");
    });

    it("should save pseudo if it does not exist", async () => {
      req.body.pseudo = "newUser";
      Home.checkUsernameExists.mockImplementation((pseudo, callback) =>
        callback(null, false),
      );
      Home.saveUsername.mockImplementation((pseudo, callback) =>
        callback(null),
      );

      await connect(req, res);

      expect(Home.checkUsernameExists).toHaveBeenCalledWith(
        "newUser",
        expect.any(Function),
      );
      expect(Home.saveUsername).toHaveBeenCalledWith(
        "newUser",
        expect.any(Function),
      );
      expect(req.session.user).toEqual({ pseudo: "newUser" });
      expect(res.redirect).toHaveBeenCalledWith("/users-without-group");
    });

    it("should handle error during username check", async () => {
      req.body.pseudo = "user";
      Home.checkUsernameExists.mockImplementation((pseudo, callback) =>
        callback(new Error("Error")),
      );

      await connect(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "Erreur lors de la vérification du pseudo",
      );
    });

    it("should handle error during username save", async () => {
      req.body.pseudo = "newUser";
      Home.checkUsernameExists.mockImplementation((pseudo, callback) =>
        callback(null, false),
      );
      Home.saveUsername.mockImplementation((pseudo, callback) =>
        callback(new Error("Error")),
      );

      await connect(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "Erreur lors de l'enregistrement du pseudo",
      );
    });
  });
});
