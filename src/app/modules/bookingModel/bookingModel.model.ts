import { Schema, model } from "mongoose";
import { TBooking } from "./bookingModel.interface";


const BookingSchema = new Schema<TBooking>(
    {
      date: {
        type: String,
        required: true,
        
      },
      
       startTime:{
            type:String,
            required:true,
            
        }
      ,
      endTime: {
        type: String,
        required: true,
        
      },
      user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
      },
      
      
      facility: {
        type: Schema.Types.ObjectId,
        
        required:true,
        ref:'Facility'
      },
      
      payableAmount:{
        type:Number,
        required:true
      },
      isBooked:{
        type:String,
        enum: {
            values: ["confirmed", "unconfirmed"," canceled"],
            message: '{VALUE} is not a valid value',
          },

        

      }
    },
    {
      timestamps: true,
    },
  );

  export const Booking = model<TBooking>('Booking', BookingSchema);