const db = require('../config/db');

class User {
  static getUserById(id, callback) {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  }

  static getUserByName(name, callback) {
    db.query("SELECT * FROM users WHERE username = ?", [name], callback);
  }

  static getUsers(callback) {
    db.query("SELECT * FROM users", callback);
  }

  static createUser(user, callback) {
    db.query("INSERT INTO users SET ?", user, callback);
  }

  static getUsersWithoutGroup(callback) {
    const query = `
      SELECT * FROM users u
      LEFT JOIN users_groups ug ON u.id = ug.user_id
      WHERE ug.group_id IS NULL
    `;
    db.query(query, callback);
  }
}

module.exports = User;
