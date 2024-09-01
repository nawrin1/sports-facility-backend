import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from 'http-status';
import { FacilityServices } from "./facility.service";



const createFacility= catchAsync(async (req, res) => {
    
    const result = await FacilityServices.createFacilityIntoDB(req.body);
  
    sendResponse(res, {
      
      success: true,
      statusCode: httpStatus.OK,
      message: 'Facility added successfully',
      data: result,
    });
  });

  const updateFacility = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacilityServices.updateFacilityIntoDB(
      id,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facility updated successfully',
      data: result,
    });
  });

  const deleteFacility = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacilityServices.deleteFacilityFromDB(id);
    // console.log(result)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facility deleted successfully',
      data: result,
    });
  });

  const getAllFacility = catchAsync(async (req, res) => {
    console.log(req.query)
      const result = await FacilityServices.getAllFacilityFromDB(req.query)

  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Facilities retrieved successfully',
        data: result,
      });
    },
  );
  
  const getSingleFacility = catchAsync(async (req, res) => {
    const {name} = req.params;
    console.log(name)

      const result = await FacilityServices.getSingleFacilityFromDB(name)

  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Facility retrieved successfully',
        data: result,
      });
    },
  );
  
  



  export const FacilityControllers = {
    createFacility,
    updateFacility,
    deleteFacility,
    getAllFacility,
    getSingleFacility

  };