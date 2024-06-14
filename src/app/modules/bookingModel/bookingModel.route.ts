import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { bookingValidationSchema } from './bookingModel.validation';
import { BookingControllers } from './bookingModel.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.user),
    
    validateRequest(bookingValidationSchema),
    BookingControllers.createBooking,
  );
router.get(
    '/',
    auth(USER_ROLE.admin),
    
   
    BookingControllers.getAllBooking,
  );




 

export const BookingRoutes = router;