/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email:string;
  password: string;
  phone: string;
  passwordChangedAt?: Date;
  role: 'admin' | 'user'
  address: string;
}

// export type TUserModel = Model<TUser,Record<string,unknown>>

export type UserModel  = {
  //instance methods for checking if the user exist

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}& Model<TUser>
// export type TUserRole = keyof typeof USER_ROLE;