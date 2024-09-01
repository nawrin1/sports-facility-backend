import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import Stripe from 'stripe';
import config from './app/config';
const app: Application = express()


//parsers
app.use(express.json());
// app.use(cors({ origin: ['http://localhost:5174'], credentials: true }));
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

const stripe = new Stripe(config.secret as string);
app.use('/api', router);

// app.post('/create-payment-intent', async (req, res) => {

  
  
//   const amount = parseInt(price * 100);
//   console.log(amount, 'amount inside the intent')

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     currency: 'usd',
//     payment_method_types: ['card']
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret
//   })
// });



app.get('/', (req: Request, res: Response) => {
  

  res.send("Sports Backend Running");
});


app.use(globalErrorHandler);

app.use(notFound);

export default app;
