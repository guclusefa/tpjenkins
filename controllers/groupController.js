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
      nom: req.body.nom,
    };

    Group.createGroup(groupe, (err) => {
      if (err) {
        console.error("Error creating groupe:", err);
        return res.status(500).send(err);
      }

      res.status(201).send("Groupe added successfully");
    });
  } catch (error) {
    console.error("Caught exception:", error);
    res.status(400).send("Invalid JSON data");
  }
}

module.exports = {
  getGroupes,
  createGroupe,
};
