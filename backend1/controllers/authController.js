const User = require('../models/role/User');
const { ROLES } = require('../models/role/RoleTypes');
const { generateToken } = require('../middleware/authMiddleware');

// @desc    Sign up a new user account (defaults strictly to 'user' role)
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  const { username, email, fullName, password } = req.body;

  let emptyFields = [];
  if (!username) emptyFields.push('username');
  if (!email) emptyFields.push('email');
  if (!fullName) emptyFields.push('fullName');
  if (!password) emptyFields.push('password');

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: 'Please fill in all required fields.',
      emptyFields
    });
  }

  const cleanUsername = username.trim().toLowerCase();
  const cleanEmail = email.trim().toLowerCase();

  try {
    // Check if username already exists
    const existingUsername = await User.findOne({ username: cleanUsername });
    if (existingUsername) {
      return res.status(400).json({ error: 'Username is already taken. Please choose another.' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: cleanEmail });
    if (existingEmail) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    // Role is strictly assigned to 'user' on signup
    const user = await User.create({
      username: cleanUsername,
      email: cleanEmail,
      fullName: fullName.trim(),
      password,
      role: ROLES.USER
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Login user / admin / superadmin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { identifier, email, password } = req.body;
  const loginInput = (identifier || email || '').trim().toLowerCase();

  if (!loginInput || !password) {
    return res.status(400).json({ error: 'Please enter both username/email and password.' });
  }

  try {
    // Search by username OR email
    const user = await User.findOne({
      $or: [
        { username: loginInput },
        { email: loginInput }
      ]
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials. Account not found.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'This account has been deactivated. Please contact support.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials. Incorrect password.' });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      fullName: req.user.fullName,
      role: req.user.role
    }
  });
};

module.exports = {
  signup,
  login,
  getMe
};
