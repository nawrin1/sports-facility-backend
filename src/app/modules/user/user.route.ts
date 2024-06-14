import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidationSchema } from './user.validation';
import { LoginValidation } from './user.login.validation';


const router = express.Router();

router.post(
    '/signup',
    
    validateRequest(userValidationSchema),
    UserControllers.createUser,
  );



  
  router.post(
    '/login',
    validateRequest(LoginValidation.UserLoginValidationSchema),
    UserControllers.loginUser,
  );
  



 

export const UserRoutes = router;