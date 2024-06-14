import { USER_ROLE } from './../user/user.constant';
import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { facilityValidationSchema } from './facility.validation';
import auth from '../../middlewares/auth';
import { FacilityControllers } from './facility.controller';


const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    
    validateRequest(facilityValidationSchema),
    FacilityControllers.createFacility,
  );
router.put(
    '/:id',
    auth(USER_ROLE.admin),
    
    validateRequest(facilityValidationSchema),
    FacilityControllers.updateFacility,
  );
router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    
    FacilityControllers.deleteFacility,
  );



export const FacilityRoutes = router;