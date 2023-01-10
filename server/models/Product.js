const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
    trim: true,
  },
  productQuantity: {
    type: String,
    required: true,
  },
  unitOfQuantity: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
