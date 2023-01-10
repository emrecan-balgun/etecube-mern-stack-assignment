const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error) => {
        if (error) {
          res.status(401).json({
            succeeded: false,
            message: 'Token not valid',
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        succeeded: false,
        message: 'Token not available',
      });
    }
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      message: 'Not authorized',
    });
  }
};
