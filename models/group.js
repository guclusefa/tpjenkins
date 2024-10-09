const db = require("../config/db");

class Group {
  static getGroups(callback) {
    db.query("SELECT * FROM groups", (err, result) => {
      if (err) throw err;
      callback(result);
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
