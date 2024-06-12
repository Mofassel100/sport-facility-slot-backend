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

export type TUserModel = Model<TUser,Record<string,unknown>>

// export type TUserRole = keyof typeof USER_ROLE;