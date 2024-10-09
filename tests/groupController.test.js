const {
    listGroups,
    createGroupe,
    getCreateGroup,
  } = require("../controllers/groupController");
  const Group = require("../models/group");
  
  jest.mock("../models/group");
  
  describe("Group Controller", () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        body: {},
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
  
    describe("listGroups", () => {
      it("should handle error when fetching groups", async () => {
        Group.getAllGroups.mockImplementation((callback) =>
          callback(new Error("Error")),
        );
  
        await listGroups(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
          "Erreur lors de la récupération des groupes",
        );
      });
  
      it("should successfully fetch groups", async () => {
        Group.getAllGroups.mockImplementation((callback) =>
          callback(null, ["group1", "group2"]),
        );
  
        await listGroups(req, res);
  
        expect(Group.getAllGroups).toHaveBeenCalled();
  
        expect(res.render).toHaveBeenCalledWith("list-groups", {
          groups: ["group1", "group2"],
        });
      });
    });
  
    describe("createGroupe", () => {
      it("should create a group successfully", async () => {
        req.body = { name: "Group 1", max_users: 10 };
  
        Group.createGroup.mockImplementation((group, callback) => callback(null));
  
        await createGroupe(req, res);
  
        expect(Group.createGroup).toHaveBeenCalledWith(
          { name: "Group 1", max_users: 10 },
          expect.any(Function),
        );
        expect(res.redirect).toHaveBeenCalledWith("/users-without-group");
      });
  
      it("should handle error when creating group", async () => {
        req.body = { name: "Group 1", max_users: 10 };
  
        Group.createGroup.mockImplementation((group, callback) =>
          callback(new Error("Error")),
        );
  
        await createGroupe(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(new Error("Error"));
      });
  
      it("should handle exception during group creation", async () => {
        req.body = { name: "Group 1", max_users: 10 };
  
        Group.createGroup.mockImplementation(() => {
          throw new Error("Exception");
        });
  
        await createGroupe(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("Invalid JSON data");
      });
    });
  
    describe("getCreateGroup", () => {
      it("should render the create group page", async () => {
        await getCreateGroup(req, res);
  
        expect(res.render).toHaveBeenCalledWith("./create-group");
      });
    });
  });
  