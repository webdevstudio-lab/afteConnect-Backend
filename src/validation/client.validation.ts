import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(3).max(255).trim(),
  contact: z.string().max(255).trim(),
  email: z.string().max(255).trim(),
  address: z.string().max(255).trim(),
  type: z.string().min(3).max(255).trim(),
  description: z.string().max(255).trim(),
});
