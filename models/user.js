const db = require("../config/db");

class User {
  static getUserById(id, callback) {
    db.query("SELECT * FROM Utilisateurs WHERE id = ?", [id], callback(result));
  }

  static getUserByName(name, callback) {
    db.query(
      "SELECT * FROM Utilisateurs WHERE Username = ? ",
      [name],
      callback
    );
  }

  static getUsers(callback) {
    db.query("SELECT * FROM Utilisateurs", callback);
  }

  static createUser(user, callback) {
    db.query("INSERT INTO Utilisateurs SET ?", user, callback(null, result));
  }

  static getUsersWithoutGroup(callback) {
    db.query(
      `
        SELECT * FROM Utilisateurs u
        LEFT JOIN UtilisateursGroupes ug ON u.UtilisateurID = ug.UtilisateurID
        WHERE ug.GroupeID IS NULL
    `,
      callback
    );
  }
}

module.exports = User;
