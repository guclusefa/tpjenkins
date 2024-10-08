const db = require('../config/db');

class User {
  static getHome(callback) {
    db.query('SELECT * FROM Utilisateurs', callback);
  };
 

}

module.exports = User;