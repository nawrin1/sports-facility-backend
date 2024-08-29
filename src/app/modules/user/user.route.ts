import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidationSchema } from './user.validation';
import { LoginValidation } from './user.login.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';


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
  
  router.get(
    '/singleUser',
    auth(USER_ROLE.user, USER_ROLE.admin),
    
    UserControllers.singleUser,
  );
  



 

export const UserRoutes = router;