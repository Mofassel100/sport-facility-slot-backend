/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';


import { User } from './user.model';

const createUserDB = async ( payload: TUser) => {
  // create a user object
  const userData: Partial<TUser> = {};
  userData.password =payload?.password 
  //set user role
  userData.role = 'user';
  const newUser = await User.create(payload); // array
  return newUser
  
};
export const UserServices = {
  createUserDB
};