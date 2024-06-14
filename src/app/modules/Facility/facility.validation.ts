import { z } from "zod";

 const createFacilityValidationSchema = z.object({
  body: z.object({
      name: z.string({required_error:"Name is Required"}),
      description: z.string({required_error:"description is Required"}),
      pricePerHour: z.number({required_error:"pricePerHour is Required"}),
      location: z.string({required_error:"location is Required"}),
  }),
});
export const FacilityValidation = {
  createFacilityValidationSchema
}