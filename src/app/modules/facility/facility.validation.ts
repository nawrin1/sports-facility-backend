import { z } from "zod";




export const facilityValidationSchema = z.object({
    body:z.object({
        name: z.string().trim(),
        description: z.string().trim(),
        pricePerHour: z.number(),
        location: z.string().trim(),
       
      })
  });
  export const facilityValidation = {
    facilityValidationSchema
  };