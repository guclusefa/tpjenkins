const db = require("../config/db");

class Group {
  static getAllGroups(callback) {
    const query = 'SELECT * FROM groups';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
}

  static createGroup(group, callback) {
    db.query("INSERT INTO groups SET ?", group, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }

  
}

module.exports = Group;
