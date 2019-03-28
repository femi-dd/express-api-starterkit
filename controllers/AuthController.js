const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const apiConfig = require('../config/api');

const register = (req, res) => {
  const user = req.body;
  UserModel.createUser(user, (error, user) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occured creating account',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: user,
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  UserModel.readUser(username, (error, user) => {
    if (error) throw error;

    if (!user) {
      return res.status(404).json({
        message: 'Username or password incorrect',
      });
    }

    // Check if password matches
    const isMatch = password === user.password;

    if (!isMatch) {
      res.status(400).json({
        message: 'Password Incorrect',
      });
    } else {
      const token = jwt.sign(user.toJSON(), apiConfig.secretOrKey, {
        expiresIn: 10080,
      });
      res.status(200).json({
        message: 'Logged in',
        token: `jwt ${token}`,
      });
    }
  });
};

const profile = (req, res) => {
  const username = req.params.username;
  UserModel.readUser(username, (error, user) => {
    if (error) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User found',
      data: {
        user,
      },
    });
  });
};

module.exports = {
  login,
  register,
  profile,
};
