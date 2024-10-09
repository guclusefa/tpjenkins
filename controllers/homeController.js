const Home = require('../models/home');

// Fonction pour gérer la page d'accueil
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

        // Vérifier si le pseudo existe déjà dans la base de données
        Home.checkPseudoExists(pseudo, (err, exists) => {
            if (err) {
                return res.status(500).send("Erreur lors de la vérification du pseudo");
            }

            if (exists) {
                // Le pseudo existe déjà, connecter l'utilisateur
                req.session.user = { pseudo }; // Stocke le pseudo dans la session
                return res.send(`Bienvenue de retour, ${pseudo} ! Vous êtes maintenant connecté.`);
            }

            // Si le pseudo n'existe pas, l'insérer
            Home.savePseudo(pseudo, (err, result) => {
                if (err) {
                    return res.status(500).send("Erreur lors de l'enregistrement du pseudo");
                }
                // Pseudo enregistré avec succès
                req.session.user = { pseudo }; // Stocke le pseudo dans la session

                res.send(`Compte créé et connecté avec le pseudo "${pseudo}"`);
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la soumission du pseudo");
    }
}

module.exports = {
    homepage,
    connect
};
