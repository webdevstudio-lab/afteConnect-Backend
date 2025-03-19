import z from "zod";

export const devisSchema = z.object({
  description: z.string().min(3).max(255).trim(),
  clientId: z.string().min(3).max(255).trim(),
});

export const itemDevisSchema = z.object({
  description: z.string().min(3).max(255).trim(),
  quantity: z.number(),
  unite: z.string().min(3).max(255).trim(),
  unitePrice: z.number(),
});
