const express = require('express');

const router = express.Router();
const usersGroupsController = require('../controllers/usersGroupsController');

router.post('/assignUser', usersGroupsController.assignUserToGroup);

module.exports = router;