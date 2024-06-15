import { IBooking } from "../modules/Booking/booking.interface";


interface TimeSlot {
  startTime: string;
  endTime: string;
}

export const getAvailableTimeSlots = (bookings: IBooking[]): TimeSlot[] => {
  const openingHour = 8; // 8:00 AM
  const closingHour = 18; // 6:00 PM
  const timeSlots: TimeSlot[] = [];

  let currentTime = new Date();
  currentTime.setHours(openingHour, 0, 0, 0);

  const closingTime = new Date();
  closingTime.setHours(closingHour, 0, 0, 0);

  bookings.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  for (const booking of bookings) {
    if (currentTime < booking.startTime) {
      timeSlots.push({
        startTime: currentTime.toTimeString().slice(0, 5),
        endTime: booking.startTime.toTimeString().slice(0, 5)
      });
    }
    currentTime = booking.endTime > currentTime ? booking.endTime : currentTime;
  }

  if (currentTime < closingTime) {
    timeSlots.push({
      startTime: currentTime.toTimeString().slice(0, 5),
      endTime: closingTime.toTimeString().slice(0, 5)
    });
  }

  return timeSlots;
};