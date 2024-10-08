const db = require("../config/db");

class UtilisateursGroupes {
    static getUtilisateursGroupes(callback) {
        db.query("SELECT * FROM UtilisateursGroupes", (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static createUtilisateursGroupes(utilisateursGroupes, callback) {
        db.query("INSERT INTO UtilisateursGroupes SET ?", utilisateursGroupes, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }
}

module.exports = UtilisateursGroupes;