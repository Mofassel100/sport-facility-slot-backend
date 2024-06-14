import { Model } from "mongoose";

 export interface TFacility {
    name: string;
    description: string;
    pricePerHour: number;
    location: string;
    isDeleted: boolean;
  }
  export type FacilityModel = Model<TFacility>