const { check } = require('express-validator');

const signUpValidation = [
	check('userName', 'Please inut your last  name').not().isEmpty(),  
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
];
const loginValidation = [
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Password length must  be up to 8 characters').isLength({ min: 8 }),
]
module.exports = { signUpValidation, loginValidation};
