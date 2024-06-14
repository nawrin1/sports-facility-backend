import { z } from "zod";
import { Role } from "./user.constant";



export const userValidationSchema = z.object({
    body:z.object({
        name: z.string().trim(),
        email: z.string().email().trim(),
        password: z.string().trim(),
        phone: z.string().trim(),
        role: z.enum([...Role] as [string, ...string[]]),
        address: z.string().trim(),
      })
  });
  export const UserValidation = {
    userValidationSchema,
  };

