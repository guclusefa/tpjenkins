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
        req.session.user = { pseudo };

        return res.redirect("/users-without-group");
      }

      Home.saveUsername(pseudo, (err) => {
        if (err) {
          return res
            .status(500)
            .send("Erreur lors de l'enregistrement du pseudo");
        }
        req.session.user = { pseudo };

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
      res.render("users-without-group", { users, user, groupId });
    });
  });
}

async function getGroupDetails(req, res) {
  const groupId = req.params.groupId;
  console.log(groupId);
  try {
    Home.getGroupDetails(groupId, (err, group) => {
      if (err) {
        return res
          .status(500)
          .send("Erreur lors de la récupération des détails du groupe");
      }
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
