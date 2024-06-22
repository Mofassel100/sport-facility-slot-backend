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
const getSingleFacilityDB = catchAsync(async (req, res) => {
  const { id} = req.params;
  const result = await FacilityServices.getSingleFacilityDB( id);

  sendResponse(res, {
    success: result ? true : false,
    statusCode:result ? httpStatus.OK:httpStatus.NOT_FOUND,
    message:result ? 'Facility is retier succesfully':"No Data Found",
    data: result ? result : {},
  });
});
const getFacilityDB = catchAsync(async (req, res) => {

  const result = await FacilityServices.getFacilityDB( );

  sendResponse(res, {
    success: result.length > 0 ? true : false,
    statusCode: result.length >0 ?  httpStatus.OK : httpStatus.NOT_FOUND,
    message:result?  'Facility is retier succesfully':"No Data Found",
    data: result,
  });
});
const deleteFacilityDB = catchAsync(async (req, res) => {
  const { id} = req.params;
  const result = await FacilityServices.deleteFacilityFromDB( id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result?  'Facility is delete succesfully': "No Data Found",
    data: result,
  });
});


export const FacilityControllers = {
  createFacilityDB,
  getSingleFacilityDB,
  deleteFacilityDB,
  getFacilityDB

};