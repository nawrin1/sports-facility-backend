import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser,UserModel>(
    {
      name: {
        type: String,
        required: true,
        
      },
      
        email:{
            type:String,
            required:true,
            unique:true
        }
      ,
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
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} is not a valid role',
          },
        required:true
      },
      
      address:{
        type:String,
        required:true
      },
    },
    {
      timestamps: true,
    },
  );

  userSchema.pre('save', async function (next) {
    const user = this; 
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  });
  

  userSchema.statics.isPasswordMatched = async function (
    plainPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };


  
  userSchema.statics.isUserExists = async function (email: string) {
    
    return (await User.findOne({email:email}));
  };

  export const User = model<TUser,UserModel>('User', userSchema);