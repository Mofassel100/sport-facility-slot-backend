import { z } from 'zod';

const querySchema = z.object({
  date: z.string().optional()
});

export { querySchema };