const jwt = require('jsonwebtoken');

const User = require('../models/User.js');

exports.authenticateToken = async (req, res, next) => {
  try {
    const token =
      req.headers['authorization'] &&
      req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(401).json({
        succeeded: false,
        message: 'No token available',
      });
    }

    req.user = User.findById(jwt.verify(token, process.env.JWT_SECRET).userID);

    next();
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      message: 'Not authorized',
    });
  }
};
