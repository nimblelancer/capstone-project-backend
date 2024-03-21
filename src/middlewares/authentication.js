const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.userId);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;

// Middleware to authenticate users
exports.authenticateUser = (req, res, next) => {
  // Extract token from request headers, cookies, or query parameters
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    // Verify token and extract user role
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to authorize admin
exports.authorizeAdmin = (req, res, next) => {
  // Check if the authenticated user is an admin (roleId = 1)
  if (req.user.roleId !== 1) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  next();
};

// Middleware to authorize users
exports.authorizeUser = (req, res, next) => {
  // Check if the authenticated user is a user (roleId = 2)
  if (req.user.roleId !== 2) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  next();
};

// Middleware to authorize doctors
exports.authorizeDoctor = (req, res, next) => {
  // Check if the authenticated user is a doctor (roleId = 3)
  if (req.user.roleId !== 3) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  next();
};
