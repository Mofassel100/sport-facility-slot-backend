/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';
const UserSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    
      
    },
    phone:{
      type:String,
      required:true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default:"user"
    },
   
 address:{
  type:String,
  required:true
 }
  },
  {
    timestamps: true,
  },
);
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});
UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};
UserSchema.statics.isUserExistsById = async function (id: string) {
  return await User.findOne({ _id:id });
};
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


// set '' after saving password
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser,UserModel>('User', UserSchema);