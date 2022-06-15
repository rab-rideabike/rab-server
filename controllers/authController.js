const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });

exports.signUp = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).send({
      status: 'success',
      token: signToken(user._id),
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: 'failed',
      message: err,
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    );
    const match = await user.isCorrectPassword(
      req.body.password,
      user.password
    );

    if (match) {
      res.status(200).send({
        status: 'success',
        token: signToken(user._id),
      });
    } else {
      res.status(404).send({
        status: 'failed',
        message: {
          error: 'Email or Password did not match',
        },
      });
    }
  } catch (err) {
    res.status(400).send({
      status: 'failed',
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  const { token } = req.body;

  if (token) {
    try {
      const isValidToken = await jwt.verify(token, process.env.JWT_SECRET);
      if (isValidToken) {
        next();
      }
    } catch (err) {
      return res.status(404).send({
        status: 'failed',
        message: {
          error: 'Invalid Token',
        },
      });
    }
  } else {
    return res.status(404).send({
      status: 'failed',
      message: {
        error: 'Missing Token',
      },
    });
  }
};
