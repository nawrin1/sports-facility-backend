import { Schema, model } from "mongoose";
import { FacilityModel, TFacility } from "./facility.interface";


const facilitySchema = new Schema<TFacility,FacilityModel>(
    {
      name: {
        type: String,
        required: true,
        unique:true
        
      },
      
        description:{
            type:String,
            required:true,
           
        }
      ,
      pricePerHour: {
        type: Number,
        required: true,
        
      },
      location:{
        type:String,
        required:true
      },

      
      isDeleted: {
        type: Boolean,
        default: false,
      }
    },
    {
      timestamps: true,
    },
  );

  facilitySchema.statics.isFacilityExists = async function (name: string) {
    
    return (await Facility.findOne({name:name}));
  };
  facilitySchema.statics.isFacilityExistsForDelete = async function (id:string) {
    
    return (await Facility.findById(id));
  };




  export const Facility = model<TFacility,FacilityModel>('Facility',facilitySchema);


