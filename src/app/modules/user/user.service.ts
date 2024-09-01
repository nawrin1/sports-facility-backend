import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { TLoginUser } from "./user.login.interface";
import { createToken } from "./user.auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import Stripe from "stripe";

const stripe = new Stripe(config.secret as string);

const createUserIntoDB = async (payload: TUser) => {

    
  // if (await User.isUserExists(payload.email)) {
  //   throw new AppError(httpStatus.BAD_REQUEST,'User already exists!');
  // }


    const result = await User.create(payload);
    const final = await User.findById(result._id).select('-password -createdAt -updatedAt -__v');
    
    
    return final;
  };
const createAdminIntoDB = async (payload: TUser) => {

    
  // if (await User.isUserExists(payload.email)) {
  //   throw new AppError(httpStatus.BAD_REQUEST,'User with same email already exists!');
  // }


    const result = await User.create(payload);
    const final = await User.findById(result._id).select('-password -createdAt -updatedAt -__v');
    
    
    return final;
  };
const singleUserFromDB = async (payload:JwtPayload) => {



    const result = await User.findOne({email:payload.user_email})
    
    
    
    return result;
  };

  const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExists(payload.email);;
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
    }
//     console.log(user,"user")

// console.log(payload.password,user.password)
  
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  
  
    const jwtPayload = {
      user_email: user.email,
      role: user.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires as string,
    );
    const user1 = await User.findOne({email:payload.email}).select('-password -createdAt -updatedAt -__v');
  
    return {
      accessToken,
      user1
     
    };
  };


  const paymentIntentService = async (price :number) => {
    // const amount = parseInt(price * 100);
    const amount = parseInt((price * 100).toString());
    console.log(amount, 'amount inside the intent')
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
  
    return({
      clientSecret: paymentIntent.client_secret
    })

  };

  export const UserServices = {
    createUserIntoDB,
    loginUser,
    singleUserFromDB,
    createAdminIntoDB,
    paymentIntentService
    
  };

  