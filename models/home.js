const db = require('../config/db');

class Home {
  static getHome(callback) {
    db.query('SELECT * FROM users', callback);
  }

  static checkUsernameExists(username, callback) {
    const query = 'SELECT * FROM users WHERE username = ?'; 
    db.query(query, [username], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results.length > 0); 
    });
  }

  static saveUsername(username, callback) {
    const query = 'INSERT INTO users (username) VALUES (?)'; 
    db.query(query, [username], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
  }

  static getUsersWithoutGroup(callback) {
    const query = `
        SELECT users.* 
        FROM users 
        LEFT JOIN users_groups ON users.id = users_groups.user_id 
        WHERE users_groups.user_id IS NULL
    `;
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
  }

  static isUserInAGroup(username, callback) {
    const query = `
      SELECT group_id 
      FROM groups, users, users_groups
      WHERE users_groups.user_id = users.id
      AND users_groups.group_id = groups.id
      AND users.username = ?
    `;
    db.query(query, [username], callback);
  }
}

module.exports = Home;
