import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {

    
  if (await User.isUserExists(payload.email)) {
    throw new AppError(httpStatus.BAD_REQUEST,'User already exists!');
  }


    const result = await User.create(payload);
    const final = await User.findById(result._id).select('-password -createdAt -updatedAt -__v');
    
    
    return final;
  };

  export const UserServices = {
    createUserIntoDB,
    
  };

  