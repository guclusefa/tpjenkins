const db = require('../config/db');

class UsersGroups {
    static getUsersGroups(callback) {
        db.query("SELECT * FROM users_groups", (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static createUsersGroups(usersGroups, callback) {
        db.query("INSERT INTO users_groups SET ?", usersGroups, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }
}

module.exports = UsersGroups;
