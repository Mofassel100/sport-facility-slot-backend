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
    message:result?  'Availability checked successfully' : "No Data Found",
    data: result,
  });
});
const createBooking = catchAsync(async (req, res) => {
 const bookingData = req.body
 const {userId} = req.user
  const result = await bookingService.createBooking(bookingData,userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  });
});
const getAllBookingFromDB = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookingFromDB();
  sendResponse(res, {
    statusCode:result.length > 0 ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: result.length > 0 ? true : false,
    message: result.length > 0 ?  'Bookings retrieved successfully':"No Data Found",
    data: result,
  });
});
// get all book (only user)
const getUserBookingFromDB = catchAsync(async (req, res) => {
  const {userId} = req.user
  const result = await bookingService.getUserBookingFromDB(userId);
  sendResponse(res, {
    statusCode: result.length > 0 ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: result.length > 0 ? true : false,
    message:result.length >0 ?  'User Bookings retrieved successfully':"No Data Found",
    data: result,
  });
});
const deleteBookingFromDB = catchAsync(async (req, res) => {
  const {userId} = req.user
  const { id} = req.params;
  const result = await bookingService.deleteBookingFromDB(id,userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result ? "User Bookings deleted successfully" : "No Data Found",
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
  checkAvailability,
  createBooking,
  getAllBookingFromDB,
  getUserBookingFromDB,
  deleteBookingFromDB

};