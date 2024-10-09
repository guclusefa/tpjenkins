const db = require('../config/db');

class Invitation {
  static createInvitation(invitation, callback) {
    const sql = "INSERT INTO Invitations (GroupeID, Token, Etat, CreateurID) VALUES (?, ?, ?, ?)";
    db.query(sql, [invitation.GroupeID, invitation.Token, invitation.Etat, invitation.CreateurID], callback);
  }

  static getByToken(token, callback) {
    const sql = "SELECT * FROM Invitations WHERE Token = ?";
    db.query(sql, [token], callback);
  }

  static updateGroup(invitationID, groupID, callback) {
    const sql = "UPDATE Invitations SET GroupeID = ? WHERE InvitationID = ?";
    db.query(sql, [groupID, invitationID], callback);
  }

  static updateStatus(invitationID, newStatus, callback) {
    const sql = "UPDATE Invitations SET Etat = ? WHERE InvitationID = ?";
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
