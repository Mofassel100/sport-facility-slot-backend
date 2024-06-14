import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";


const createFacilityDB = async ( payload: TFacility) => {
  // create a user object
  const newFacility = await Facility.create(payload); // array
  return newFacility
  
};
export const FacilityServices = {
  createFacilityDB
};