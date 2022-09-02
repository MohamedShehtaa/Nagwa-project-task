import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // console.log(err);

  // Operational, trusted error:send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or other unknown error: don't leak error details
  else {
    console.log(`Error 💥💥`, err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

export default globalErrorHandler;
