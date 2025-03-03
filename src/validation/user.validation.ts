import z from "zod"

export const updateUserSchema = z.object({
    fullname: z.string().min(3).max(255).trim().optional(),
    poste: z.string().min(3).max(255).trim().optional(),
    role: z.string().min(3).max(255).trim().optional(),
    isActive: z.boolean().optional()
});