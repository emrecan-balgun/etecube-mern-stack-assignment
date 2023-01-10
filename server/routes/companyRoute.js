const express = require('express');

const companyController = require('../controllers/companyController.js');

const router = express.Router();

router.route('/').get(companyController.getAllCompanies); // localhost:3000/companies
router.route('/').post(companyController.createCompany); // localhost:3000/companies
router.route('/:id').get(companyController.getCompany); // localhost:3000/companies/:id
router.route('/:id').put(companyController.updateCompany); // localhost:3000/companies/:id
router.route('/:id').delete(companyController.deleteCompany); // localhost:3000/companies/:id

module.exports = router;