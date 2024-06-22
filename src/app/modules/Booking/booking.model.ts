import { Schema, model } from "mongoose";
import { BookingModel, IBooking, TSBooking } from "./booking.interface";

const BookingSchema = new Schema<IBooking,BookingModel>({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
    payableAmount: { type: Number, required: true },
    isBooked: { type: String, enum: ['confirmed', 'unconfirmed', 'canceled'], default: 'unconfirmed' }
  });
  

// const SBookingSchema = new Schema<TSBooking>({
//   date: { type: String, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
// });

export const Booking = model<IBooking>('Booking',BookingSchema);

