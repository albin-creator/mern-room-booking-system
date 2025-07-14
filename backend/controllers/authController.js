const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const generateToken = require('../utils/generateToken');

// Register USER
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ username, email, password });
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: 'user',
    token: generateToken(user._id)
  });
};

// Register ADMIN
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  const adminExists = await Admin.findOne({ email });
  if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

  const admin = await Admin.create({ email, password });
  res.status(201).json({
    _id: admin._id,
    email: admin.email,
    role: 'admin',
    token: generateToken(admin._id)
  });
};

// Common Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    return res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: 'user'
      }
    });
  }

  const admin = await Admin.findOne({ email });
  if (admin && await admin.matchPassword(password)) {
    return res.json({
      token: generateToken(admin._id),
      user: {
        _id: admin._id,
        email: admin.email,
        role: 'admin'
      }
    });
  }

  res.status(401).json({ message: 'Invalid email or password' });
};

module.exports = { registerUser, registerAdmin, login };
