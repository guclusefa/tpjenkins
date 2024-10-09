const express = require("express");

const router = express.Router();
const groupController = require("../controllers/groupController");

router.get("/", groupController.getGroupes);


router.post("/create-group", groupController.createGroupe);

router.get("/create-group", groupController.getCreateGroup)

module.exports = router;
