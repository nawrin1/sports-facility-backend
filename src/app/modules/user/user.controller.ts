import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from 'http-status';
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    
  
  
    const result = await UserServices.createUserIntoDB(req.body);
  
    sendResponse(res, {
      
      success: true,
      statusCode: httpStatus.OK,
      message: 'User registered successfully',
      data: result,
    });
  });
const createAdmin = catchAsync(async (req, res) => {
    
  
  
    const result = await UserServices.createAdminIntoDB(req.body);
  
    sendResponse(res, {
      
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin created successfully',
      data: result,
    });
  });
const singleUser = catchAsync(async (req, res) => {
  console.log("in single user")
    
  
  
    const result = await UserServices.singleUserFromDB(req.user);
  
    sendResponse(res, {
      
      success: true,
      statusCode: httpStatus.OK,
      message: 'User retrived successfully',
      data: result,
    });
  });

  const loginUser = catchAsync(async (req, res) => {
    console.log("login")
    const result = await UserServices.loginUser(req.body);
    const {accessToken,user1}=result


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is logged in succesfully!',
      token:accessToken,
      data: user1   });
  });


  const paymentIntent = catchAsync(async (req, res) => {
    console.log("intent")

    const { price } = req.body;
    const result = await UserServices.paymentIntentService(price);
    


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Client secret generated successfully!',
      data:result
  });
})



  export const UserControllers = {
    createUser,
    loginUser,
    singleUser,
    createAdmin,
    paymentIntent

  };