import { z } from 'zod';

const querySchema = z.object({
  date: z.string().optional()
});
const createBookingValidationSchema = z.object({
  body: z.object({
      facility: z.string({required_error:"facility is Required"}),
      date: z.string({required_error:"date is Required"}),
      startTime: z.string({required_error:"startTime is Required"}),
      endTime: z.string({required_error:"endTime is Required"}),
  }),
});
export { querySchema };
export const ValidationBooking = {
  createBookingValidationSchema
}