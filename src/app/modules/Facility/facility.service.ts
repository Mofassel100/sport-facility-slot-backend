import mongoose from "mongoose";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const createFacilityDB = async ( payload: TFacility) => {
  // create a user object
  const newFacility = await Facility.create(payload); // array
  return newFacility
  
};
const getSingleFacilityDB = async ( id: string) => {
  // create a user object
  const getFacility = await Facility.findById({_id:id}); 
  console.log(getFacility)
  return getFacility
  
};
const getFacilityDB = async ( ) => {
  // create a user object
  const getFacility = await Facility.find(); 
 
  return getFacility
  
};
const updateFacilityFromDB = async(id:string,data:Partial<TFacility>)=>{
  const UpdatedFacility = await Facility.findByIdAndUpdate(
    {_id:id},
    { ...data },
    { new: true},
  );
  return UpdatedFacility
}
const deleteFacilityFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedFacility = await Facility.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFacility) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Facility');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFacility;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete Facility');
  }
};

export const FacilityServices = {
  createFacilityDB,
  getSingleFacilityDB,
  getFacilityDB,
  deleteFacilityFromDB,
  updateFacilityFromDB 
};