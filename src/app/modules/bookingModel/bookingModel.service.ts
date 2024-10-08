import httpStatus from "http-status";
import { Facility } from "../facility/facility.model";
import { TBooking } from "./bookingModel.interface";
import AppError from "../../error/AppError";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { Booking } from "./bookingModel.model";
import { hasBookingTimeConflict } from "./bookingTimeConflict";
import { parseISO, isValid } from 'date-fns';
import { findAvailableSlots } from "./bookingAvailable";

const isValidTimeFormat = (time: string): boolean => {
  // Basic regex to check if time is in HH:MM format
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
};

const  createBookingIntoDB = async (userData:JwtPayload,payload: TBooking) => {
    // console.log(payload,"from book")
    const newBook:Record<string,any>={}
    const facilityValue=await Facility.isFacilityExistsForDelete(payload.facility)
    if (!facilityValue) {
        throw new AppError(httpStatus.BAD_REQUEST,'Facility does not exists!');
      }

      const facilityValueDeleted = await Facility.isFacilityExistsForDeleteTrue(payload.facility);
  if (facilityValueDeleted.isDeleted==true) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility has been deleted and does not exist. You cannot book this!');
  }

    

    const userId=await User.findOne({email:userData.user_email})
    let userIdString=""
    if (userId) {
        
        userIdString = userId._id.toString();
        // console.log(userIdString, "userid");
    
    }
    else{
        throw new AppError(httpStatus.BAD_REQUEST,"No Data Found")
    }

    if (!isValidTimeFormat(payload.startTime) || !isValidTimeFormat(payload.endTime)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid time format. Please use HH:MM format.');
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

const getAllBookingFromDB = async () => {
        const result = await Booking.find().populate({
            path: 'user',
            select: '-password -createdAt -updatedAt -__v'
          })
          .populate({
            path: 'facility',
            select: '-createdAt -updatedAt -__v'
          })
          .select('-createdAt -updatedAt -__v');
        return result;
};


const getUserBookingFromDB = async (payload:JwtPayload) => {
    // console.log(payload,"userrrr")
    const userId=await User.findOne({email:payload.user_email})
    let userIdString=""
    if (userId) {
        
        userIdString = userId._id.toString();

    }



        const result = await Booking.find({user:userIdString})
          
          .populate({
            path: 'facility',
            select: '-createdAt -updatedAt -__v'
          })
          .select('-createdAt -updatedAt -__v -password');
        if(result.length==0){
          throw new AppError(httpStatus.NOT_FOUND,"No Data Found")
        }

        //   console.log(result,"resss")
        return result;
};
const getSingleBookingFromDB = async (payload:string) => {
    




        const result = await Booking.findById(payload)
          
          .populate({
            path: 'facility',
            select: '-createdAt -updatedAt -__v'
          })
          .select('-createdAt -updatedAt -__v -password');
        // if(result.length==0){
        //   throw new AppError(httpStatus.NOT_FOUND,"No Data Found")
        // }

        //   console.log(result,"resss")
        return result;
};

const deleteBookingFromDB = async (id: string) => {


          const deletedBooking= await Booking.findByIdAndUpdate(
             id ,
            { isBooked: "canceled" },
            { new: true,fields: '-createdAt -updatedAt -__v'},
          ).populate({
            path: 'facility',
            select: '-createdAt -updatedAt -__v'
          });
      
          if (!deletedBooking) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Booking');
          }

          return deletedBooking
      };
const checkBookingFromDB = async (value: string|undefined,facility:string) => {
    let date;
    if (value) {
        date = parseISO(value);
        if (!isValid(date)) {
           throw new AppError(httpStatus.BAD_REQUEST,'Invalid date format. Please use YYYY-MM-DD')
         
        }
      } else {
        date = new Date();
      }

      console.log(value,"from check")
      const bookingValue = await Booking.find({
        date: value,
        facility:facility
        
      }).select('startTime endTime -_id');
      console.log(bookingValue,"booked")

      
    

      const finalSlots= findAvailableSlots(bookingValue)
      if (finalSlots.length==0){
        throw new AppError(httpStatus.NOT_FOUND,"No Slots Available")

      }
      return finalSlots;

      

          

          
      };

   
export const BookingServices={
    createBookingIntoDB,
    getAllBookingFromDB,
    getUserBookingFromDB,
    deleteBookingFromDB,
    checkBookingFromDB,
    getSingleBookingFromDB
}