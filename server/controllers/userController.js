const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User.js');

exports.register = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({
      succeeded: true,
      message: 'You have successfully registered',
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      message: 'Such a user is already registered',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); // because username is unique
    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeeded: false,
        message: 'User not found!',
      });
    }

    if (same) {
      const token = this.createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // one day
      });

      res.status(200).json({
        succeeded: true,
        message: 'You have successfully logged in, redirecting...',
        userToken: token,
      });
    } else {
      res.status(401).json({
        succeeded: false,
        message: 'Password are not match!',
      });
    }
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      message: 'Something went wrong',
    });
  }
};

exports.createToken = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.getDashboard = (res) => {
  res.status(200).redirect('/dashboard');
};

exports.checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json({
        succeeded: true,
        message: 'You are authorized to access this page',
      });
    }
    res.status(401).json({
      succeeded: false,
      message: 'You are not authorized to access this page',
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      message: 'Something went wrong',
    });
  }
};

exports.getTotalUsers = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    res.status(200).json({
      succeeded: true,
      totalUser,
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      message: 'Something went wrong',
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      succeeded: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      message: 'Something went wrong',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      succeeded: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      succeeded: false,
      message: 'Something went wrong',
    });
  }
};
