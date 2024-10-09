const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const Home = require("../models/home");
router.get("/", homeController.homepage);
router.post("/connect", homeController.connect);
router.get("/users-without-group", homeController.listUsersWithoutGroup);

router.get("/group-details/:groupId", homeController.getGroupDetails);

module.exports = router;
