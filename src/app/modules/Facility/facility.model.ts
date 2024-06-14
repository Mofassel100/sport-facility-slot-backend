import { Schema, model } from "mongoose";
import { FacilityModel, TFacility } from "./facility.interface";

const FacilitySchema = new Schema<TFacility,FacilityModel>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
  });
  
 export const Facility = model<TFacility>('Facility', FacilitySchema);