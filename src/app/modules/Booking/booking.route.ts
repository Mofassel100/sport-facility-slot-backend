import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingControllers } from './booking.controller';



const router = express.Router();


router.get(
  '/check-availability',
bookingControllers.checkAvailability
);



export const BookingRoutes = router;