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


export const FacilityRoutes = router;