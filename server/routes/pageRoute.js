const express = require('express');

const pageController = require('../controllers/pageController.js');

const router = express.Router();

router.route('/').get(pageController.welcome); // localhost:8000/

module.exports = router;
