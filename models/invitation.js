const db = require('../config/db');

class Invitation {
  static createInvitation(invitation, callback) {
    const sql = "INSERT INTO invitations (group_id, token, status, creator_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [invitation.group_id, invitation.token, invitation.status, invitation.creator_id], callback);
  }

  static getByToken(token, callback) {
    const sql = "SELECT * FROM invitations WHERE token = ?";
    db.query(sql, [token], callback);
  }

  static updateGroup(invitationID, groupID, callback) {
    const sql = "UPDATE invitations SET group_id = ? WHERE id = ?";
    db.query(sql, [groupID, invitationID], callback);
  }

  static updateStatus(invitationID, newStatus, callback) {
    const sql = "UPDATE invitations SET status = ? WHERE id = ?";
    db.query(sql, [newStatus, invitationID], (err, result) => {
        if (err) {
            console.error("SQL Error during invitation status update:", err);
        } else {
            console.log("Invitation status update result:", result);
        }
        callback(err, result);
    });
  }
}

module.exports = Invitation;
