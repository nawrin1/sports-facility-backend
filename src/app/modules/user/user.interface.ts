import { Model } from "mongoose";

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

  }
  

export type TRole= 'admin'|'user';