const express = require('express');

const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/', groupController.getGroupes);
router.post('/add', groupController.createGroupe);


module.exports = router;