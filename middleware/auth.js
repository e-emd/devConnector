const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get token from the header
  const token = req.header('x-auth-token');

  //check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token found authorization denied' });
  }

  //verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'token is not valid ' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('Something went wrong with auth');
    res.status(500).json({ msg: 'Server Error ' });
  }
};
