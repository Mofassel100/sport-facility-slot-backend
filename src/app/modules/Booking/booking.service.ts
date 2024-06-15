import { Request, Response } from 'express';
import { Booking } from './booking.model';
import { getAvailableTimeSlots } from '../../utils/timeUtiles';
import { IBooking } from './booking.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// Adjust the path as necessaryAdjust the path as necessary
const createBooking = async (payload:IBooking,userId: string) => {
    const { facility, date, startTime, endTime } = payload
  

    const overlappingBooking = await Booking.findOne(
        facility,
       );
  
    
  
      // Calculate payable amount (example calculation, adjust as necessary)
      const payableAmount = (new Date(`${date}T${endTime}:00Z`).getTime() - new Date(`${date}T${startTime}:00Z`).getTime()) / 3600000 * 30;
  
      // Create a new booking
      const newBooking = new Booking({
        facility,
        date,
        startTime,
        endTime,
        user:userId,
        payableAmount,
        isBooked: 'confirmed'
      });
  
      (await (await newBooking.save()).populate("facility")).populate("user");
  
  return newBooking
   
  };
  
const checkAvailability = async (dateParam:string) => {

  const date = dateParam ? new Date(dateParam) : new Date();
  // const queryDate = date || new Date().toISOString().split('T')[0]; // Default to today's date if not provided

 console.log(date)
  const bookings = await Booking.find({ date:date });
    // const totalSlots: TimeSlot[] = [
    //   { startTime: '08:00', endTime: '10:00' },
    //   { startTime: '14:00', endTime: '16:00' },
    // ];
    console.log(bookings,"kdfk")
    const availableSlots = getAvailableTimeSlots(bookings);
 
    console.log(availableSlots)
return availableSlots
    // const response: AvailabilityResponse = {
    //   success: true,
    //   statusCode: 200,
    //   message: 'Availability checked successfully',
    //   data: availableSlots,
    // };

    // res.json(response);
 
};


export const  bookingService = {
    checkAvailability,
createBooking
}