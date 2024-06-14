import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    name:string;
    email:string;
    password:string;
    phone:string;
    role:'admin'|'user';
    address:string;

}


export interface UserModel extends Model<TUser> {
    
    // eslint-disable-next-line no-unused-vars
    isUserExists(email: string): Promise<TUser>;
    isPasswordMatched(
        // eslint-disable-next-line no-unused-vars
        plainPassword: string,
        // eslint-disable-next-line no-unused-vars
        hashedPassword: string,
      ): Promise<boolean>;

  }
  

export type TRole= 'admin'|'user';
export type TUserRole = keyof typeof USER_ROLE;