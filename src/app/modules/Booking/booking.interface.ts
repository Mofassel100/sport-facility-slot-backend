import { Schema } from "mongoose";


export interface IBooking {
    date: Date;
    startTime: Date;
    endTime: Date;
    user: Schema.Types.ObjectId;
    facility: Schema.Types.ObjectId;
    payableAmount: number;
    isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
  }
  