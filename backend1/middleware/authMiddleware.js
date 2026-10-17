const jwt = require('jsonwebtoken');
const User = require('../models/role/User');
const { ROLES } = require('../models/role/RoleTypes');

const JWT_SECRET = process.env.JWT_SECRET || 'cambridge_jwt_secret_key_2026_secure';

// Helper to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Middleware: Verify JWT and attach user
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'This account has been deactivated.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// Middleware: Authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Role '${req.user ? req.user.role : 'none'}' is not authorized to access this resource.`
      });
    }
    next();
  };
};

const requireSuperAdmin = authorize(ROLES.SUPER_ADMIN);
const requireAdmin = authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN);

module.exports = {
  generateToken,
  protect,
  authorize,
  requireSuperAdmin,
  requireAdmin
};
