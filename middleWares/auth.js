const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const config = require('config');
const secret = config.get("jwtSecret")

module.exports = (req, res, next) => {
    let token = req.header('X-auth-token');
    try {
        const decoded = jwt.verify(token, secret);
        if (decoded.exp > Date.now() / 1000) {
            req.user = decoded.id;
			next();
		} else {
			return next(new AppError('access denied session ended please log in again', 401));
		}

    } catch (err) {
        if (err) {
			return next(new AppError(err, 402));
		}
    }
}