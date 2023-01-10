const Company = require('../models/Company.js');

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
    res.status(200).json({
      succeeded: true,
      data: {
        companies,
      },
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
      data: {
        company,
      },
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
    res.status(200).json({
      succeeded: true,
      message: 'Company deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};
