import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
const {email,password}= payload
console.log(email,password,payload)
  const user = await User.findOne({email:email});

console.log(user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  if (!(await User.isPasswordMatched(password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user._id ,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
console.log
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
   user,
   refreshToken
  };
};



const refreshToken = async (token: string) => {
  // checking if the given token is valid
  // const decoded = jwt.verify(
  //   token,
  //   config.jwt_refresh_secret as string,
  // ) as JwtPayload;

  // const { userId, iat } = decoded;

  // // checking if the user is exist
  // // const user = await User.isUserExists(userId);

  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  // }
  // // checking if the user is already deleted
  // // const isDeleted = user?.isDeleted;

  // // if (isDeleted) {
  // //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  // // }

  // // // checking if the user is blocked
  // // const userStatus = user?.status;

  // // if (userStatus === 'blocked') {
  // //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  // // }

  // // if (
  // //   user.passwordChangedAt &&
  // //   User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  // // ) {
  // //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  // // }

  // const jwtPayload = {
  //   userId: user.email,
  //   role: user.role,
  // };

  // const accessToken = createToken(
  //   jwtPayload,
  //   config.jwt_access_secret as string,
  //   config.jwt_access_expires_in as string,
  // );

  // return {
  //   accessToken,
  // };
};

export const AuthServices = {
  loginUser,
 
  refreshToken,
};