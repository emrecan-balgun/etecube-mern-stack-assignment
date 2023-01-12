const Company = require('../models/Company.js');
const Product = require('../models/Product.js');

exports.createCompany = async (req, res) => {
  try {
    await Company.create(req.body);
    res.status(201).json({
      succeeded: true,
      message: 'Company created successfully',
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    const totalCompany = await Company.countDocuments();
    const recentCompanies = await Company.find()
      .sort({ createdAt: -1 })
      .limit(3);
    res.status(200).json({
      succeeded: true,
      companies,
      totalCompany,
      recentCompanies,
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json({
      succeeded: true,
      company,
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    await Company.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      succeeded: true,
      message: 'Company updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    await Product.deleteMany({ company: req.params.id }); // Delete all products associated with the company
    res.status(200).json({
      succeeded: true,
      message: 'Company and its products deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};
