const userModel = require("../models/user");
const bcrypt = require("bcrypt");


const findUserWithId = function (_id) {
  return userModel.findOne({ _id }).select('-password')
}

const loginUser = function (userData) {
  return userModel.find({ email: userData.email });
};

const findUserWithEmail = function (email) {
  return userModel.findOne({ email });
};
const saveChangesToUser = function (user) {
  return user.save();
};

module.exports = {
  findUserWithId,
  loginUser,
  findUserWithEmail,
  saveChangesToUser,
}
