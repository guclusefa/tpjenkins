const Group = require("../models/group");
const Invitation = require("../models/invitation");

async function getGroupes(req, res) {
  Groupe.getGroupes((err, result) => {
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

    Group.createGroupe(groupe, (err, result) => {
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

async function configureGroups(req, res) {
  const { nombreUtilisateurs, nombreGroupes, configuration } = req.body;

  const utilisateursParGroupe = Math.floor(nombreUtilisateurs / nombreGroupes);
  const reste = nombreUtilisateurs % nombreGroupes;

  let groupes = [];
  for (let i = 0; i < nombreGroupes; i++) {
    let tailleGroupe;
    if (i === nombreGroupes - 1 && reste !== 0) {
      tailleGroupe =
        configuration === "LAST_MIN"
          ? utilisateursParGroupe - 1
          : utilisateursParGroupe + 1;
    } else {
      tailleGroupe = utilisateursParGroupe;
    }

    const groupe = {
      nom: `Groupe ${i + 1}`,
    };
    Group.createGroupe(groupe, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error creating group", details: err });
      }
    });

    groupes.push(groupe);
  }

  res.status(201).json({ message: "Groups configured successfully", groupes });
}

module.exports = {
  getGroupes,
  createGroupe,
  configureGroups
};
