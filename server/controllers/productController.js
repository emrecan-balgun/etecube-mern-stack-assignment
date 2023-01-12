const Product = require('../models/Product.js');

exports.createProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.status(201).json({
      succeeded: true,
      message: 'Product created successfully',
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('company'); // populate the company field with the company data
    const totalProduct = await Product.countDocuments();
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(3);
    res.status(200).json({
      succeeded: true,
      products,
      totalProduct,
      recentProducts,
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('company'); // populate the company field with the company data
    res.status(200).json({
      succeeded: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      succeeded: true,
      message: 'Product updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      succeeded: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      succeeded: false,
      message: error,
    });
  }
};
