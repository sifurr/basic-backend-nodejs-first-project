import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import handlerGlobalError from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1', router);


// testing route
const test = (req: Request, res: Response) => {
  // Promise.reject();
  const hello = 'Hello World!';
  res.send(hello);
};

app.get('/', test);

// global error handler, use it at the bottom of all all error handler middlewares
app.use(handlerGlobalError);

// not found
app.use(notFound);

export default app;
