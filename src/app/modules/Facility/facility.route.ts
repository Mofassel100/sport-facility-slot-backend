import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidation } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import auth from '../../middlewares/auth';
import { UserRoutes } from '../user/user.route';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

router.post(
  '/facility',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.createFacilityValidationSchema),
  FacilityControllers.createFacilityDB
);
router.put(
  '/facility/:id',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.updatedFacilityValidationSchema),
  FacilityControllers.UpdatedFacilityDB
);
router.get(
  '/facility/:id',
  FacilityControllers.getSingleFacilityDB
);
router.get(
  '/facility',
  // auth(USER_ROLE.user),
  FacilityControllers.getFacilityDB
);
router.delete(
  '/facility/:id',
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacilityDB
);


export const FacilityRoutes = router;