const usersGroups = require('../models/usersGroups');

async function assignUserToGroup(req, res) {
    try {
        const utilisateursGroupes = {
            idUtilisateur: req.body.idUtilisateur,
            idGroupe: req.body.idGroupe,
        };
    
        usersGroups.createUtilisateursGroupes(utilisateursGroupes, (err, result) => {
            if (err) {
                console.error("Error assigning user to group:", err);
                return res.status(500).send(err);
            }
    
            res.status(201).send("User assigned to group successfully");
        });
    } catch (error) {
        console.error("Caught exception:", error);
        res.status(400).send("Invalid JSON data");
    }
}

module.exports = {
    assignUserToGroup,
};