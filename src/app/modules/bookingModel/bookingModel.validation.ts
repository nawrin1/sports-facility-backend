import { z } from "zod";





export const bookingValidationSchema = z.object({
    body:z.object({
        facility: z.string().trim(),
        date: z.string().trim(),
        startTime: z.string().trim(),
        endTime:z.string().trim(),
        
      })
  });
  export const BookingValidation = {
    bookingValidationSchema
  };

