const usersGroups = require("../models/usersGroups");
const Invitation = require("../models/invitation");
const Group = require("../models/group");
const crypto = require("crypto");

async function assignUserToGroup(userID, groupID, res) {
  try {
    const utilisateursGroupes = {
      user_id: userID,
      group_id: groupID,
    };

    usersGroups.createUsersGroups(
      utilisateursGroupes,
      (err, result) => {
        if (err) {
          console.error("Error assigning user to group:", err);
          return res.status(500).send(err);
        }

        res.status(201).send("User assigned to group successfully");
      }
    );
  } catch (error) {
    console.error("Caught exception:", error);
    res.status(400).send("Invalid data");
  }
}

async function joinGroupWithInvitation(req, res) {
  const { token, userID } = req.body;

  Invitation.getByToken(token, (err, invitation) => {
    if (err || !invitation) {
      console.error("Invalid token or error fetching invitation:", err);
      return res.status(404).json({ error: "Invalid invitation token" });
    }

    if (invitation[0].status !== "PENDING") {
      console.error("Invitation already used:", invitation);
      return res.status(400).json({ error: "Invitation already used" });
    }

    if (!invitation.GroupeID) {
      Group.createGroup(
        { name: `Groupe de ${invitation.creator_id}` },
        (err, groupResult) => {
          if (err) {
            console.error("Failed to create group:", err);
            return res
              .status(500)
              .json({ error: "Failed to create group", details: err });
          }

          Invitation.updateGroup(
            invitation.InvitationID,
            groupResult.insertId,
            (err) => {
              if (err) {
                console.error("Failed to update invitation group:", err);
                return res
                  .status(500)
                  .json({ error: "Failed to update invitation", details: err });
              }

              console.log(
                "Invitation updated with new group ID:",
                groupResult.insertId
              );

              assignUserToGroup(userID, groupResult.insertId, res);

              console.log(invitation)
              Invitation.updateStatus(
                invitation[0].InvitationID,
                "ACCEPTED",
                (err) => {
                  if (err) {
                    console.error("Error updating invitation status:", err);
                  } else {
                    console.log(
                      "Invitation status updated to ACCEPTED for invitation ID:",
                      invitation.InvitationID
                    );
                  }
                }
              );
            }
          );
        }
      );
    } else {
      assignUserToGroup(userID, invitation.GroupeID, res);
;
      Invitation.updateStatus(invitation[0].InvitationID, "ACCEPTED", (err) => {
        if (err) {
          console.error("Error updating invitation status:", err);
        } else {
          console.log(
            "Invitation status updated to ACCEPTED for invitation ID:",
            invitation.InvitationID
          );
        }
      });
    }
  });
}

async function createGroupWithInvitation(req, res) {
  const { creatorID } = req.body;
  const token = crypto.randomBytes(16).toString("hex");

  console.log({
    GroupeID: null,
    Token: token,
    Etat: "PENDING",
    CreateurID: creatorID,
  })

  const invitation = {
    group_id: null,
    token: token,
    status: "PENDING",
    creator_id: creatorID,
  };

  Invitation.createInvitation(invitation, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to create invitation", details: err });
    }

    res.status(201).json({ message: "Invitation created successfully", token });
  });
}

module.exports = {
  assignUserToGroup,
  joinGroupWithInvitation,
  createGroupWithInvitation,
};
