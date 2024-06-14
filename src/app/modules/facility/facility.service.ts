import httpStatus from "http-status";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";
import AppError from "../../error/AppError";

const createFacilityIntoDB = async (payload: TFacility) => {

    
      if (await Facility.isFacilityExists(payload.name)) {
        throw new AppError(httpStatus.BAD_REQUEST,'Facility already exists!');
      }
    
    
        const result = await Facility.create(payload);
        const final = await Facility.findById(result._id).select('-createdAt -updatedAt -__v');
        
        
        return final;
      };

export const FacilityServices={
    createFacilityIntoDB
}
    