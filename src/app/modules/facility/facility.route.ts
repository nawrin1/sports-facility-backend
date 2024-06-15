import { USER_ROLE } from './../user/user.constant';
import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { facilityUpdateValidationSchema, facilityValidationSchema } from './facility.validation';
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
    
    validateRequest(facilityUpdateValidationSchema),
    FacilityControllers.updateFacility,
  );
router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    
    FacilityControllers.deleteFacility,
  );
router.get(
    '/',

    FacilityControllers.getAllFacility,
  );



export const FacilityRoutes = router;