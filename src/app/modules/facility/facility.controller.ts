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
  



  export const FacilityControllers = {
    createFacility,
    updateFacility,
    deleteFacility

  };