import { Types } from "mongoose";

export interface TBooking {
    date:string;
    startTime:string;
    endTime:string;
    facility:Types.ObjectId;
    user:Types.ObjectId;
    payableAmount:number;
    isBooked:"confirmed"| "unconfirmed"|" canceled";

}

export type TBookSchedule = {
    date: string;
    startTime: string;
    endTime: string;
  };

 export interface TimeSlot {
    startTime: string;
    endTime: string;
  }

export type TBookingConfirm= "confirmed"| "unconfirmed"|" canceled";