const bcrypt = require('bcrypt');

const User = require('../models/User.js');

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      succeded: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error,
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
        succeded: false,
        message: 'User not found',
      });
    }

    if (same) {
      res.status(200).json({
        succeded: true,
        message: 'You are logged in',
      });
    } else {
      res.status(401).json({
        succeded: false,
        message: 'Password are not match',
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      message: error,
    });
  }
};
