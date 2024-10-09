const express = require('express');

const router = express.Router();
const usersGroupsController = require('../controllers/usersGroupsController');

router.post('/assignUser', usersGroupsController.assignUserToGroup);
router.post('/createWithInvitation', usersGroupsController.createGroupWithInvitation);
router.post('/joinWithInvitation', usersGroupsController.joinGroupWithInvitation);

module.exports = router;
