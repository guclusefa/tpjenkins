const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.homepage);
router.post('/connect', homeController.connect);
router.get('/users-without-group', homeController.listUsersWithoutGroup);

module.exports = router;