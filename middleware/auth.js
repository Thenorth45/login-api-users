const jwt = require('jsonwebtoken');
const Boxer = require('../models/Boxer.js');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, '2bfaf34cecd96c55bd5e95566ea96294c28aaf66161c5cbcbca705eb21f5f39b15f49b1dc22b5ebab71414c6a7c40ab6ff950615e8b2bdc31ec3d66d945ca2a6');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Permission Denied');
    }
    next();
  };
};

module.exports = { authenticate, authorize };
