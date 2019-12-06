const { signUpUser, loginUser, verifyUserAccountToken, confirmSignUp } = require('../services/authServices');
const { findUserWithId, findUserWithEmail, saveChangesToUser } = require('../services/userServices');

const url = require('url');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');
// const nodemailer = require('nodemailer');
// const Transport = require('nodemailer--transport')

module.exports = function authController() {
	this.signUp = (req, res, next) => {
		
	};

	this.login = (req, res, next) => {
		
	};
	this.getLoggedInUser = (req, res, next) => {
		
	}
};
