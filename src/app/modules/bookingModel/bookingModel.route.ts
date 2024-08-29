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
router.get(
    '/user',
    auth(USER_ROLE.user),
    
   
    BookingControllers.getUserBooking,
  );
router.delete(
    '/:id',
    auth(USER_ROLE.user),
    
   
    BookingControllers.deleteBooking,
  );
router.get(
    '/:id',
    
    
   
    BookingControllers.singleBooking,
  );
router.get(
    '/check-availability',
 
    
   
    BookingControllers.checkBooking,
  );




 

export const BookingRoutes = router;