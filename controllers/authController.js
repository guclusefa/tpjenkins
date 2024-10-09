const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  User.getUserByName(req.body.username, async (err, users) => {
    if (err) {
        console.log(users)
      console.error("Error during login: ", err);
      return res
        .status(500)
        .json({ error: "Login failed", details: err.message });
    }

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    const token = jwt.sign({ id: user.UtilisateurID }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({ token });
  });
}

module.exports = {
  login,
};
