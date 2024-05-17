import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

// testing
const getHelloController = (req: Request, res: Response) => {
  const hello = 'Hello World!';
  res.send(hello);
};

app.get('/', getHelloController);

export default app;
