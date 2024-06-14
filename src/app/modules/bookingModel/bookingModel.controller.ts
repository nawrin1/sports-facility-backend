import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { BookingServices } from "./bookingModel.service";

const createBooking = catchAsync(async (req, res) => {
    // console.log(req.user)
    
  
  
    const result = await BookingServices.createBookingIntoDB(req.user,req.body);
  
    sendResponse(res, {
      
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking created successfully',
      data: result,
    });
  });
export const BookingControllers={
    createBooking
}