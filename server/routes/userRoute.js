const express = require('express');

const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.route('/register').post(userController.register); // localhost:3000/users/register
router.route('/login').post(userController.login); // localhost:3000/users/login
router.route('/dashboard').get(authMiddleware.authenticateToken, userController.getDashboard); // localhost:3000/users/dashboard

module.exports = router;
