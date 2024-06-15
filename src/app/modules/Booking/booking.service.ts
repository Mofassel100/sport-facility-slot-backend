import { Request, Response } from 'express';
import { Booking } from './booking.model';
import { getAvailableTimeSlots } from '../../utils/timeUtiles';

// Adjust the path as necessaryAdjust the path as necessary

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
    checkAvailability
}