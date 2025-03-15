import z from "zod";

export const devisSchema = z.object({
    description: z.
    string()
    .min(3, 'La description doit avoir au moins 3 caractères')
    .max(255)
    .trim(),
    nomClient: z.
    string()
    .min(3, 'Le nom du client doit avoir au moins 3 caractères')
    .max(255)
    .trim(),
});