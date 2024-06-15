import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidation } from './facility.validation';
import { FacilityControllers } from './facility.controller';


const router = express.Router();

router.post(
  '/facility',
  validateRequest(FacilityValidation.createFacilityValidationSchema),
  FacilityControllers.createFacilityDB
);
router.get(
  '/facility/:id',
  FacilityControllers.getSingleFacilityDB
);
router.get(
  '/facility',
  FacilityControllers.getFacilityDB
);
router.delete(
  '/facility/:id',
  FacilityControllers.deleteFacilityDB
);


export const FacilityRoutes = router;