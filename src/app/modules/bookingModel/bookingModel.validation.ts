import { z } from "zod";





export const bookingValidationSchema = z.object({
    body:z.object({
        facility: z.string().trim(),
        date: z.string().trim(),
        startTime: z.string().trim(),
        endTime:z.string().trim(),
        
      }).refine(
        (body) => {
        
          const start = new Date(`2020-01-01T${body.startTime}:00`);
          const end = new Date(`2020-01-01T${body.endTime}:00`);
  
          return end > start;
        },
        {
          message: 'End time should be bigger than start time!  ',
        },
      ),
  });
  export const BookingValidation = {
    bookingValidationSchema
  };

