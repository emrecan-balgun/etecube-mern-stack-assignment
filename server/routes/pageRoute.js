const express = require('express');

const pageController = require('../controllers/pageController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.route('/').get(authMiddleware.authenticateToken, pageController.welcome); // localhost:3000/

module.exports = router;
