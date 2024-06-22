import { Model, Schema } from "mongoose";


export interface IBooking {
    date: Date;
    startTime: string;
    endTime: string;
    user: Schema.Types.ObjectId;
    facility: Schema.Types.ObjectId;
    payableAmount: number;
    isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
  }
  export type BookingModel = Model<IBooking>
   export interface TSBooking  {
    date: string;
    startTime: string;
    endTime: string;
  }
 export interface TimeSlot {
    startTime: string;
    endTime: string;
  }
  
  export interface AvailabilityResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: TimeSlot[];
  }