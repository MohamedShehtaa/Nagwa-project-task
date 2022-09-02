import cors from 'cors';
import dotev from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import globalErrorHandler from './controllers/errorController';
import indexRouter from './routes';
import AppError from './utils/AppError';

const app = express();

// Global middleware
app.use(cors()); // Access-Control-Allow-Origin
app.use(helmet()); // Set security HTTP headers

app.use(express.json()); //  reading data from body into req.body =>Body parser

// Development logging
if (process.env.NODE_ENV === 'development') {
    console.log('Start Development');
    app.use(morgan('dev'));
} else {
    console.log('Start Production');
}

//routes
app.use('/api/v1', indexRouter);

// Global route
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


// Global error handler middleware
app.use(globalErrorHandler);


export default app;  