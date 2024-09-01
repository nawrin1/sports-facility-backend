import { z } from "zod";




export const facilityValidationSchema = z.object({
    body:z.object({
        name: z.string().trim(),
        description: z.string().trim(),
        pricePerHour: z.number(),
        location: z.string().trim(),
        image: z.string().trim(),
       
      })
  });

export const facilityUpdateValidationSchema = z.object({
    body:z.object({
        name: z.string().trim().optional(),
        description: z.string().trim().optional(),
        pricePerHour: z.number().optional(),
        location: z.string().trim().optional(),
        image: z.string().trim().optional(),
       
      })
  });
  export const facilityValidation = {
    facilityValidationSchema,
    facilityUpdateValidationSchema
  };