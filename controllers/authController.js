const { signUpUser, loginUser } = require('../services/authServices');
const { findUserWithId } = require('../services/userServices');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const AppError = require('../utils/appError');
const config = require('config');
const secret = config.get("jwtSecret")

module.exports = function authController() {
	this.signUp = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(new AppError(errors, 400));
		}
		bcrypt.hash(req.body.password,10, (err, hash) => {
			signUpUser(req.body, hash)
				.then((user) => {
					res.status(200).json({
						status : true,
						message: "User was successfully created"
					})
				})
				.catch(error => {
					return next(new AppError(error, 400));
				})
			if(err) {
				return next(new AppError(err, 400));
			}
		})
	};

	this.login = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(new AppError(errors, 400));
		}
		loginUser(req.body)
			.then((user) => {
				if(!user) {
					return next(new AppError("Email does not exist in database, please sign up", 400)); 
				}
				bcrypt.compare(req.body.password, user.password, (err, result) => {
					if(result) {
						const token = jwt.sign(
							{ email: user.email, id : user._id},
							secret,
							{ expiresIn: '1h' }
						)

						res.status(200).json({
							status: true,
							message: 'login successful',
							token: token,
						})
					}  else {
						return next(new AppError("Please enter correct password", 401));
					}
				})
			})
			.catch(error => {
				return next(new AppError(error, 500));
			})
	};
	this.getLoggedInUser = (req, res, next) => {
		findUserWithId(req.user)
			.then(user => {
				if (!user) { 
					return next(new AppError('We were unable to find a user for this token.', 400));
				} else {
				res.status(200).json({
						status: true,
						message: 'login successful',
						user: user
					});	
				}
			})
			.catch(error => {
				return next(new AppError(error, 500));
			})
	}
};
