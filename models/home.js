const db = require("../config/db");

class Home {
  static getHome(callback) {
    db.query("SELECT * FROM users", callback);
  }

  static checkUsernameExists(username, callback) {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.length > 0);
    });
  }

  static saveUsername(username, callback) {
    const query = "INSERT INTO users (username) VALUES (?)";
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

  static getUserGroupId(username, callback) {
    const query = `
        SELECT users_groups.group_id 
        FROM users 
        LEFT JOIN users_groups ON users.id = users_groups.user_id 
        WHERE users.username = ?
    `;
    db.query(query, [username], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      // Return the group ID if found, otherwise return null
      callback(null, results.length > 0 ? results[0].group_id : null);
    });
  }

  static getGroupDetails(groupId, callback) {
    const query = `
        SELECT g.name, u.username 
            FROM groups AS g
            JOIN users_groups AS ug ON g.id = ug.group_id
            JOIN users AS u ON u.id = ug.user_id
            WHERE g.id = ?;
    `;
    db.query(query, [groupId], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      // Structure the data
      const group = {
        name: results[0]?.name || "Groupe inconnu",
        description:
          results[0]?.description || "Pas de description disponible.",
        members: results
          .map((result) => ({ username: result.username }))
          .filter((member) => member.username),
      };

      callback(null, group);
    });
  }
}

module.exports = Home;
