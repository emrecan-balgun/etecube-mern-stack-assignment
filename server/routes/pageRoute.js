const express = require('express');

const pageController = require('../controllers/pageController.js');

const router = express.Router();

router.route('/').get(pageController.welcome); // localhost:3000/

module.exports = router;
