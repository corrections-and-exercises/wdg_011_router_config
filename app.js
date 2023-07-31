import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routes/user.js';

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.use(errorHandler);

export default app;
