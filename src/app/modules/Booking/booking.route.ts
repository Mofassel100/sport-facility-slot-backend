import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { ValidationBooking } from './booking.validation';


const router = express.Router();
router.get(
  '/check-availability',
bookingControllers.checkAvailability
);
router.post(
  '/bookings',
  auth(USER_ROLE.user),
  validateRequest(ValidationBooking.createBookingValidationSchema),
bookingControllers.createBooking
);
router.get(
  '/bookings',
  auth(USER_ROLE.admin),
bookingControllers.getAllBookingFromDB
);
router.get(
  '/bookings/user',
  auth(USER_ROLE.user),
bookingControllers.getUserBookingFromDB
);
router.delete(
  '/bookings/:id',
  auth(USER_ROLE.user),
bookingControllers.deleteBookingFromDB
);

export const BookingRoutes = router;