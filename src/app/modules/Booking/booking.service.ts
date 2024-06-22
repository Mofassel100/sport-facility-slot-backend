import { Request, Response } from 'express';
import { Booking } from './booking.model';
import { getAvailableTimeSlots } from '../../utils/timeUtiles';
import { IBooking } from './booking.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Facility } from '../Facility/facility.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

// Adjust the path as necessaryAdjust the path as necessary
const createBooking = async (payload:IBooking,userId: any) => {
  const { facility, date, startTime, endTime } = payload
// console.log(startTime,endTime)
  const overlappingBooking = await Facility.findOne(
        {_id:facility}
       );
      //  console.log("facility",overlappingBooking) 
  const perHoure = overlappingBooking?.pricePerHour
  const start = new Date(`${date}T${startTime}:00Z`).getTime();
  console.log("start:",start)
  const end = new Date(`${date}T${endTime}:00Z`).getTime();
  const hours = (end - start) / 3600000;
  const pricePerHour = perHoure as number; // You can retrieve this from the facility model if it varies
  const payableAmount = hours * pricePerHour;
      // Calculate payable amount (example calculation, adjust as necessary)
//       const payableAmount = (new Date(`${date}T${endTime}:00Z`).getTime() - new Date(`${date}T${startTime}:00Z`).getTime()) / 3600000 * 30;
// console.log(perHoure,"payableAmount",start,end, hours)
      // Create a new booking
  const newBooking = {
        facility,
        date,
        startTime:startTime,
        endTime:endTime,
        user:userId,
        payableAmount,
        isBooked: 'confirmed'
      };
    console.log(newBooking)
  
  const result = await Booking.create(newBooking);
  
  return result
   
  };
  
const checkAvailability = async (dateParam:string) => {

  const date = dateParam ? new Date(dateParam) : new Date();
  // const queryDate = date || new Date().toISOString().split('T')[0]; // Default to today's date if not provided

//  console.log(date)
  const bookings = await Booking.find({ date:date });
    // const totalSlots: TimeSlot[] = [
    //   { startTime: '08:00', endTime: '10:00' },
    //   { startTime: '14:00', endTime: '16:00' },
    // ];
    // console.log(bookings,"kdfk")
const availableSlots = getAvailableTimeSlots(bookings);
     return availableSlots
   };

// get all booking(only admin)
const getAllBookingFromDB = async()=>{
const result = await Booking.find()
return result
}
// get all booking(only user)
const getUserBookingFromDB = async(userId :string)=>{
  const isUserExist = await User.findOne({_id: userId})
  if(!isUserExist){
    throw new AppError(httpStatus.BAD_REQUEST,"User does not exist")
  }
  const isBooking = await Booking.find({user:userId})
  if(!isBooking){
    throw new AppError(httpStatus.BAD_REQUEST,"User does not book any facility")
  }
  
  return isBooking
}

const deleteBookingFromDB = async (id: string,userId:string) => {
  const isUserExist = await User.findOne({_id: userId})
  if(!isUserExist){
    throw new AppError(httpStatus.BAD_REQUEST,"User does not exist")
  }
  const isBooking = await Booking.find({user:userId})
  if(!isBooking){
    throw new AppError(httpStatus.BAD_REQUEST,"User does not book any facility")
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFacility = await Booking.findByIdAndUpdate(
      {_id:id},
      { isBooked: "canceled" },
      { new: true, session },
    );

    if (!deletedFacility) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Facility');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFacility;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete Booking');
  }
};

export const  bookingService = {
    checkAvailability,
    createBooking,
    getAllBookingFromDB,
    getUserBookingFromDB,
    deleteBookingFromDB
}