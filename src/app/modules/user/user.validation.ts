import { z } from "zod";

 const createUserValidationSchema = z.object({
  body: z.object({
      name: z.string({required_error:"Name is Required"}),
      email: z.string({required_error:"Email is Required"}).email(),
      password: z.string({required_error:"password is Required"}).max(20),
      phone: z.string({required_error:"phone is Required"}),
      role:z.enum(["admin", "user"]),
      address:z.string({required_error:"address is required"})  
  }),
});
export const UserValidation = {
  createUserValidationSchema
}
