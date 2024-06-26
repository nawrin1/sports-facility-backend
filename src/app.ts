import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  

  res.send("Sports Backend Running");
});


app.use(globalErrorHandler);

app.use(notFound);

export default app;
