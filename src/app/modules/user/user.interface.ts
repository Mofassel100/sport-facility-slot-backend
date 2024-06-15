/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id?:string
  name: string;
  email:string;
  password: string;
  phone: string;
  role: 'admin' | 'user'
  address: string;
}

// export type TUserModel = Model<TUser,Record<string,unknown>>

export type UserModel  = {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isUserExistsById(id: string): Promise<TUser>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}& Model<TUser>
export type TUserRole = keyof typeof USER_ROLE;