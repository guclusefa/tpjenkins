const User = require("../models/user");

async function getUsers(req, res) {
  User.getUsers((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}

async function createUser(req, res) {
  try {
    const user = {
      username: req.body.username,
    };

    User.createUser(user, (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).send("Username already exists");
        }
        console.error("Error creating user:", err);
        return res.status(500).send(err);
      }

      res.status(201).send("User added successfully");
    });
  } catch (error) {
    console.error("Caught exception:", error);
    res.status(400).send("Invalid JSON data");
  }
}

async function listUsersWithoutGroup(req, res) {
  User.getUsersWithoutGroup((err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve users", details: err });
    }
    res.status(200).json(result);
  });
}

module.exports = {
  getUsers,
  createUser,
  listUsersWithoutGroup,
};
