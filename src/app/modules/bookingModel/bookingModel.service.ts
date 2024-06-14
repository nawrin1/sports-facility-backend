import httpStatus from "http-status";
import { Facility } from "../facility/facility.model";
import { TBooking } from "./bookingModel.interface";
import AppError from "../../error/AppError";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { Booking } from "./bookingModel.model";
import { hasBookingTimeConflict } from "./bookingTimeConflict";

const  createBookingIntoDB = async (userData:JwtPayload,payload: TBooking) => {
    // console.log(payload,"from book")
    const newBook:Record<string,any>={}
    const facilityValue=await Facility.isFacilityExistsForDelete(payload.facility)
    if (!facilityValue) {
        throw new AppError(httpStatus.BAD_REQUEST,'Facility does not exists!');
      }

    const userId=await User.findOne({email:userData.user_email})
    let userIdString=""
    if (userId) {
        
        userIdString = userId._id.toString();
        // console.log(userIdString, "userid");
    
    }
    else{
        throw new AppError(httpStatus.BAD_REQUEST,"User does not Exist")
    }
    const payValue=facilityValue.pricePerHour
    const start=payload.startTime
    const end=payload.endTime

    const startTimeObj = new Date(`2000-01-01T${start}:00`);
    const endTimeObj = new Date(`2000-01-01T${end}:00`);
  
    
    const durationMili = endTimeObj.getTime() - startTimeObj.getTime();
    const durationHours = durationMili / (1000 * 60 * 60); 

    const payable = durationHours * payValue;

    
    newBook.facility=payload.facility;
    newBook.date=payload.date;
    newBook.startTime=payload.startTime;
    newBook.endTime=payload.endTime;
    newBook.user=userIdString;
    newBook.payableAmount=payable;
    newBook.isBooked="confirmed"

    //if facility is available
    const schedules=await Booking.find({facility:payload.facility}).select('date startTime endTime')
    // console.log(schedules)
    const newSchedule = {
        date:payload.date,
        startTime:payload.startTime,
        endTime:payload.endTime,
      };
    
      if (hasBookingTimeConflict(schedules, newSchedule)) {
        throw new AppError(
          httpStatus.CONFLICT,
          `This facility is not available at that slot.Please choose other time or day because of time conflict`,
        );
      }

    
        const result = await Booking.create(newBook);
        const final = await Booking.findById(result._id).select('-createdAt -updatedAt -__v');

        return final;
        

      };

export const BookingServices={
    createBookingIntoDB
}