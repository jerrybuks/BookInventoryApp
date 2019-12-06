const { signUpUser, loginUser, editUser, dashboard } = require("../services/userServices");
const { verifyUserAccountToken } = require("../services/authServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const checkAuth = require("../middleWares/auth");

module.exports = function userController() {
  
};
