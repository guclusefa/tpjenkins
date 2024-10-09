const {
  homepage,
  connect,
  listUsersWithoutGroup,
  getGroupDetails
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
    };
  });

  describe("homepage", () => {
    it("should render the homepage with classes", async () => {
      Home.getHome.mockImplementation(callback => callback(null, ["class1", "class2"]));

      await homepage(req, res);

      expect(Home.getHome).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith("./home", { classe: ["class1", "class2"] });
    });

    it("should return 500 if there is an error fetching classes", async () => {
      Home.getHome.mockImplementation(callback => callback(new Error("Database Error"), null));

      await homepage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(new Error("Database Error"));
    });
  });

  describe("connect", () => {
    it("should return 400 if pseudo is missing", async () => {
      await connect(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Pseudo requis");
    });

    it("should connect user if pseudo exists", async () => {
      req.body.pseudo = "existingUser";
      Home.checkUsernameExists.mockImplementation((pseudo, callback) => callback(null, true));

      await connect(req, res);

      expect(Home.checkUsernameExists).toHaveBeenCalledWith("existingUser", expect.any(Function));
      expect(req.session.user).toEqual({ pseudo: "existingUser" });
      expect(res.redirect).toHaveBeenCalledWith("/users-without-group");
    });

    it("should save pseudo if it does not exist", async () => {
      req.body.pseudo = "newUser";
      Home.checkUsernameExists.mockImplementation((pseudo, callback) => callback(null, false));
      Home.saveUsername.mockImplementation((pseudo, callback) => callback(null));

      await connect(req, res);

      expect(Home.checkUsernameExists).toHaveBeenCalledWith("newUser", expect.any(Function));
      expect(Home.saveUsername).toHaveBeenCalledWith("newUser", expect.any(Function));
      expect(req.session.user).toEqual({ pseudo: "newUser" });
      expect(res.redirect).toHaveBeenCalledWith("/users-without-group");
    });

    it("should handle error during username check", async () => {
      req.body.pseudo = "user";
      Home.checkUsernameExists.mockImplementation((pseudo, callback) => callback(new Error("Error")));

      await connect(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Erreur lors de la vérification du pseudo");
    });

    it("should handle error during username save", async () => {
      req.body.pseudo = "newUser";
      Home.checkUsernameExists.mockImplementation((pseudo, callback) => callback(null, false));
      Home.saveUsername.mockImplementation((pseudo, callback) => callback(new Error("Error")));

      await connect(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Erreur lors de l'enregistrement du pseudo");
    });
  });

  describe("listUsersWithoutGroup", () => {
    it("should list users without group successfully", async () => {
      req.session.user = { pseudo: "user" };
      Home.getUserGroupId.mockImplementation((pseudo, callback) => callback(null, 1));
      Home.getUsersWithoutGroup.mockImplementation(callback => callback(null, ["user1", "user2"]));

      await listUsersWithoutGroup(req, res);

      expect(Home.getUserGroupId).toHaveBeenCalledWith("user", expect.any(Function));
      expect(Home.getUsersWithoutGroup).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith("users-without-group", {
        users: ["user1", "user2"],
        user: { pseudo: "user" },
        groupId: 1,
      });
    });

    it("should return 500 if there is an error fetching users without group", async () => {
      req.session.user = { pseudo: "user" };
      Home.getUserGroupId.mockImplementation((pseudo, callback) => callback(null, 1));
      Home.getUsersWithoutGroup.mockImplementation(callback => callback(new Error("Error fetching users")));

      await listUsersWithoutGroup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Erreur lors de la récupération des utilisateurs sans groupe");
    });
  });

  describe("getGroupDetails", () => {
    it("should return group details successfully", async () => {
      req.params.groupId = 1;
      Home.getGroupDetails.mockImplementation((groupId, callback) => callback(null, { id: 1, name: "group1" }));

      await getGroupDetails(req, res);

      expect(Home.getGroupDetails).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.render).toHaveBeenCalledWith("group-details", { group: { id: 1, name: "group1" } });
    });

    it("should return 500 if there is an error fetching group details", async () => {
      req.params.groupId = 1;
      Home.getGroupDetails.mockImplementation((groupId, callback) => callback(new Error("Error fetching group details")));

      await getGroupDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Erreur lors de la récupération des détails du groupe");
    });
  });
});
