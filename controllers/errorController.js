const AppError = require('../utils/appError');
const config = require('config');
const environ = config.get("NODE_ENV")

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.message.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Value already exists: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, res) => {
   res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
   
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (environ === 'development') {
    sendErrorDev(err, res);
  } else if (environ === 'production') {
    let error; 

    if(err.message) {
      if (err.message.name === 'CastError') error = handleCastErrorDB(err);
      if (err.message.code === 11000) error = handleDuplicateFieldsDB(err);
      if (err.message.name === 'JsonWebTokenError') error = handleJWTError();
      if (err.message.name === 'TokenExpiredError') error = handleJWTExpiredError();
      if (err.message.name === 'ValidationError') error = handleValidationErrorDB(err);
    }

    if(error) {
      return sendErrorProd(error, res);
    } else {
     return sendErrorProd((err), res);
    }
    
  }
};
