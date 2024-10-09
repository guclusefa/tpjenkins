const db = require('../config/db');

class Home {
  static getHome(callback) {
    db.query('SELECT * FROM Utilisateurs', callback);
  }

  static checkPseudoExists (pseudo, callback) {
    const query = 'SELECT * FROM Utilisateurs WHERE username = ?'; 
    db.query(query, [pseudo], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results.length > 0); 
    });
}

static savePseudo(pseudo, callback) {
    const query = 'INSERT INTO Utilisateurs (username) VALUES (?)'; 
    db.query(query, [pseudo], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
}

 static getUsersWithoutGroup (callback) {
    const query = `
        SELECT Utilisateurs.* 
            FROM Utilisateurs 
            LEFT JOIN UtilisateursGroupes ON Utilisateurs.UtilisateurID = UtilisateursGroupes.UtilisateurID 
            WHERE UtilisateursGroupes.UtilisateurID IS NULL
    `;
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
}
  
    static isUserInAGroup(pseudo,callback){
        const query=`
        Select GroupeID 
        FROM Groupes, Utilisateurs, UtilisateursGroupes
        where UtilisateursGroupes.UtilisateurID = Utilisateurs.UtilisateurID
        and UtilisateursGroupes.GroupeID = Groupe.GroupeID
        and Utilisateurs.Username = (?)
        `
    }
}

module.exports = Home;

