const db = require("../config/db");

class User {
  static getUserById(id, callback) {
    db.query("SELECT * FROM Utilisateurs WHERE id = ?", [id], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  static getUsers(callback) {
    db.query("SELECT * FROM Utilisateurs", (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  static createUser(user, callback) {
    db.query("INSERT INTO Utilisateurs SET ?", user, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
}

module.exports = User;
