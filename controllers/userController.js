const User = require("../models/user");

async function getUsers(req, res) {
  User.getUsers((err, result) => {
    if (err) {
      res.send(err);
    }
  });
}

async function createUser(req, res) {
    try {
      const user = {
        username: req.body.username,
      };
  
      User.createUser(user, (err, result) => {
        if (err) {
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
  

module.exports = {
  getUsers,
  createUser,
};
