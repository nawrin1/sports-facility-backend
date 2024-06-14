import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { FacilityRoutes } from '../modules/facility/facility.route';
import { BookingRoutes } from '../modules/bookingModel/bookingModel.route';



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },{
    path:'/facility',
    route:FacilityRoutes
  },
  {
    path:'/bookings',
    route:BookingRoutes
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;