const db = require('../config/db');

class Groupe {
    static getGroupes(callback) {
        db.query("SELECT * FROM Groupes", (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static createGroupe(groupe, callback) {
        db.query("INSERT INTO Groupes SET ?", groupe, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }
}

module.exports = Groupe;