import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';


const createFacilityDB = catchAsync(async (req, res) => {
  const { ...FacilityData } = req.body;

  const result = await FacilityServices.createFacilityDB( FacilityData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility is created succesfully',
    data: result,
  });
});


export const FacilityControllers = {
  createFacilityDB,

};