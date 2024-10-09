const Home = require('../models/home');

async function homepage(req, res) {
    Home.getHome((err, classes) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.render('./home', { classe: classes });
        }
    });
}

async function connect(req, res) {
    try {
        const pseudo = req.body.pseudo; 

        if (!pseudo) {
            return res.status(400).send("Pseudo requis");
        }

        Home.checkPseudoExists(pseudo, (err, exists) => {
            if (err) {
                return res.status(500).send("Erreur lors de la vérification du pseudo");
            }

            if (exists) {
                // Le pseudo existe déjà, connecter l'utilisateur
                req.session.user = { pseudo }; // Stocke le pseudo dans la session
                return res.redirect('/users-without-group');
            }

            // Si le pseudo n'existe pas, l'insérer
            Home.savePseudo(pseudo, (err, result) => {
                if (err) {
                    return res.status(500).send("Erreur lors de l'enregistrement du pseudo");
                }
                // Pseudo enregistré avec succès
                req.session.user = { pseudo }; // Stocke le pseudo dans la session

                return res.redirect('/users-without-group');
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la soumission du pseudo");
    }
}

async function listUsersWithoutGroup(req, res) {
    const user = req.session.user;
    Home.getUsersWithoutGroup((err, users) => {
        if (err) {
            return res.status(500).send("Erreur lors de la récupération des utilisateurs sans groupe");
        }
        res.render('users-without-group', { users, user }); // Envoyer la liste des utilisateurs sans groupe à la vue
    });
}
module.exports = {
    homepage,
    connect,
    listUsersWithoutGroup
};
