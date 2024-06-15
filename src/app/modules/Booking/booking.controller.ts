import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { querySchema } from './booking.validation';
import { bookingService } from './booking.service';


const checkAvailability = catchAsync(async (req, res) => {
  const dateParam = req.query.date as string;

  const result = await bookingService.checkAvailability(dateParam);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  });
});
// const getSingleFacilityDB = catchAsync(async (req, res) => {
//   const { id} = req.params;
//   const result = await FacilityServices.getSingleFacilityDB( id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Facility is retier succesfully',
//     data: result,
//   });
// });
// const getFacilityDB = catchAsync(async (req, res) => {
 
//   const result = await FacilityServices.getFacilityDB( );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Facility is retier succesfully',
//     data: result,
//   });
// });
// const deleteFacilityDB = catchAsync(async (req, res) => {
//   const { id} = req.params;
//   const result = await FacilityServices.deleteFacilityFromDB( id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Facility is delete succesfully',
//     data: result,
//   });
// });


export const bookingControllers = {
  checkAvailability

};