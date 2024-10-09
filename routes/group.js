const express = require("express");

const router = express.Router();
const groupController = require("../controllers/groupController");

router.get("/", groupController.getGroupes);

router.get("/create-group", groupController.getCreateGroup)
router.post("/create-group", groupController.createGroupe);

module.exports = router;
