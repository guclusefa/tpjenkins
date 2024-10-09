const Group = require("../models/group");

async function getGroupes(req, res) {
  Group.getGroups((err) => {
    if (err) {
      res.send(err);
    }
  });
}

async function createGroupe(req, res) {
  try {
    const groupe = {
      name: req.body.name,
      max_users: req.body.max_users
    };

    Group.createGroup(groupe, (err) => {
      if (err) {
        console.error("Error creating groupe:", err);
        return res.status(500).send(err);
      }

      res.redirect("/users-without-group")
    });
  } catch (error) {
    console.error("Caught exception:", error);
    res.status(400).send("Invalid JSON data");
  }
}


async function getCreateGroup(req, res){
  res.render("./create-group" );
}
module.exports = {
  getGroupes,
  createGroupe,
  getCreateGroup

};
