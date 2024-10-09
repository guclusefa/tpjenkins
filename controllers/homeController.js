const Home = require("../models/home");

async function homepage(req, res) {
  Home.getHome((err, classes) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.render("./home", { classe: classes });
    }
  });
}

async function connect(req, res) {
  try {
    console.log(req.body);
    const pseudo = req.body.pseudo;

    if (!pseudo) {
      return res.status(400).send("Pseudo requis");
    }

    Home.checkUsernameExists(pseudo, (err, exists) => {
      if (err) {
        return res.status(500).send("Erreur lors de la vérification du pseudo");
      }

      if (exists) {
        // Le pseudo existe déjà, connecter l'utilisateur
        req.session.user = { pseudo }; // Stocke le pseudo dans la session

        return res.redirect("/users-without-group");
      }

      // Si le pseudo n'existe pas, l'insérer
      Home.saveUsername(pseudo, (err, result) => {
        if (err) {
          return res
            .status(500)
            .send("Erreur lors de l'enregistrement du pseudo");
        }
        // Pseudo enregistré avec succès
        req.session.user = { pseudo }; // Stocke le pseudo dans la session

        return res.redirect("/users-without-group");
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la soumission du pseudo");
  }
}

async function listUsersWithoutGroup(req, res) {
  const user = req.session.user;

  // Add a check to find the user's group ID
  Home.getUserGroupId(user.pseudo, (err, groupId) => {
    if (err) {
      return res
        .status(500)
        .send("Erreur lors de la récupération de l'ID de groupe");
    }

    Home.getUsersWithoutGroup((err, users) => {
      if (err) {
        return res
          .status(500)
          .send("Erreur lors de la récupération des utilisateurs sans groupe");
      }
      res.render("users-without-group", { users, user, groupId }); // Pass the groupId to the view
    });
  });
}

async function getGroupDetails(req, res) {
  const groupId = req.params.groupId; // Get the groupId from the URL parameters
  console.log(groupId);
  try {
    // Fetch the group details and members from the model
    Home.getGroupDetails(groupId, (err, group) => {
      if (err) {
        return res
          .status(500)
          .send("Erreur lors de la récupération des détails du groupe");
      }
      // Render the group details view with the group data
      res.render("group-details", { group });
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Erreur lors de la récupération des détails du groupe");
  }
}

module.exports = {
  homepage,
  connect,
  listUsersWithoutGroup,
  getGroupDetails,
};
