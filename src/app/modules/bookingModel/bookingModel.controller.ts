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


  const getAllBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingFromDB()


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved successfully',
      data: result,
    });
  },
);
  const getUserBooking = catchAsync(async (req, res) => {

    console.log(req.user, "from userbooking")

    const result = await BookingServices.getUserBookingFromDB(req.user)


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved successfully',
      data: result,
    });
  },
);

const deleteBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    const result = await BookingServices.deleteBookingFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking cancelled successfully',
      data: result,
    });
  });
const singleBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    const result = await BookingServices.getSingleBookingFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Booking Fetched successfully',
      data: result,
    });
  });



const checkBooking = catchAsync(async (req, res) => {
  console.log(req.query)
    const date=req.query?.date as string

    console.log(date)
    const result = await BookingServices.checkBookingFromDB(date,req.query?.facility as string);
    const responseObject: any = {
        success: true,
        statusCode: httpStatus.OK,
        message: "Availability checked successfully",
        data: result
      };
    return res.json(responseObject)
  
   
  });


export const BookingControllers={
    createBooking,
    getAllBooking,
    getUserBooking,
    deleteBooking,
    checkBooking,
    singleBooking
}