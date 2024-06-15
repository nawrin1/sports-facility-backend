import { Model, Types } from "mongoose";

export interface TFacility {
    name:string;
    description:string;
    pricePerHour:number;
    location:string;
    isDeleted:boolean

}

export interface FacilityModel extends Model<TFacility> {
    
    // eslint-disable-next-line no-unused-vars
    isFacilityExists(name: string): Promise<TFacility>;
    // eslint-disable-next-line no-unused-vars
    isFacilityExistsForDelete(id: Types.ObjectId): Promise<TFacility>;
    // eslint-disable-next-line no-unused-vars
    isFacilityExistsForDeleteTrue(id: Types.ObjectId): Promise<TFacility>;
  

  }




