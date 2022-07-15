const User = require("../models/UserModel");
const catchAsyc = require('../utils/catchAsync');

exports.getUsers = catchAsyc(async (req, res) => {
  const users = await User.find({});

  res.status(200).send({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsyc(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).send({
    status: "success",
    user,
  });
});

exports.getUserById = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.find({ _id }).exec();
    res.status(200).send({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(404).send({
      status: "failed",
      err,
    });
  }
};

exports.updateUserById = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(404).send({
      status: "failed",
      err,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    res.status(200).send({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(404).send({
      status: "failed",
      err,
    });
  }
};

exports.getUserById;
