const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/add', userController.createUser);

router.get('/withoutGroup', userController.listUsersWithoutGroup);

module.exports = router;
