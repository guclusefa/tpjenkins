const Group = require("../models/group");

async function listGroups(req, res) {
  Group.getAllGroups((err, groups) => {
      if (err) {
          return res.status(500).send("Erreur lors de la récupération des groupes");
      }

      res.render('list-groups', { groups }); // Render the view with the groups data
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
  listGroups,
  createGroupe,
  getCreateGroup

};
