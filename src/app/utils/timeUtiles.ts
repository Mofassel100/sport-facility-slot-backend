import { IBooking, TSBooking } from "../modules/Booking/booking.interface";


interface TimeSlot {
  startTime: string;
  endTime: string;
}

export const getAvailableTimeSlots = (bookings: IBooking[]): TimeSlot[] => {
  const openingHour = 8; // 8:00 AM
  const closingHour = 18; // 6:00 PM
  const timeSlots: TimeSlot[] = [];
  //  const parsedDate = new Date(date);
  //     const parsedStartTime = new Date(`${date}T${startTime}:00.000Z`);
  //     const parsedEndTime = new Date(`${date}T${endTime}:00.000Z`);
  let currentTime = new Date();
  currentTime.setHours(openingHour, 0, 0, 0);

  const closingTime = new Date();
  closingTime.setHours(closingHour, 0, 0, 0);

  bookings.sort((a, b) =>new Date(`${a.date}T${a.startTime}:00.000Z`)?.getTime() - new Date(`${b.date}T${b.startTime}:00.000Z`)?.getTime());

  for (const booking of bookings) {
    if (currentTime < new Date(`${booking?.date}T${booking?.startTime}:00.000Z`)) {
      timeSlots.push({
        startTime: currentTime?.toTimeString().slice(0, 5),
        endTime: new Date(`${booking?.date}T${booking?.startTime}:00.000Z`)?.toTimeString().slice(0, 5)
      });
    }
    currentTime =new Date(`${booking?.date}T${booking?.endTime}:00.000Z`) > currentTime ? new Date(`${booking?.date}T${booking?.endTime}:00.000Z`) : currentTime;
  }

  if (currentTime < closingTime) {
    timeSlots.push({
      startTime: currentTime.toTimeString().slice(0, 5),
      endTime: closingTime.toTimeString().slice(0, 5)
    });
  }

  return timeSlots;
};