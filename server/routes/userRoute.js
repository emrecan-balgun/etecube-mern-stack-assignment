const express = require('express');

const userController = require('../controllers/userController.js');

const router = express.Router();

router.route('/register').post(userController.register); // localhost:3000/users/register
router.route('/login').post(userController.login); // localhost:3000/users/login

module.exports = router;
