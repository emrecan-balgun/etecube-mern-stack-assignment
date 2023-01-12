const express = require('express');

const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.route('/register').post(userController.register); // localhost:8000/users/register
router.route('/login').post(userController.login); // localhost:8000/users/login
// router.route('/dashboard').get(authMiddleware.authenticateToken, userController.getDashboard); // localhost:8000/users/dashboard
router.route('/checkUser/:id').get(userController.checkUser); // localhost:8000/users/checkUser/id
router.route('/totalUsers').get(userController.getTotalUsers); // localhost:8000/users/totalUsers
router.route('/').get(userController.getAllUsers); // localhost:8000/users
router.route('/:id').delete(userController.deleteUser); // localhost:8000/users/id

module.exports = router;
