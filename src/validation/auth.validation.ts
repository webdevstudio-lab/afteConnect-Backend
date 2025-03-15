import { userInfo } from "os";
import { z } from "zod";

export const emailSchema = z
  .string()
  .email("cette adresse email n'est pas valide")
  .trim()
  .min(1)
  .max(255);

export const passwordSchema = z
  .string()
  .trim()
  .min(6, "Le mot de passe doit avoir au moins 6 caractères")
  .max(255);

export const registerSchema = z.object({
  fullname: z.string().min(3).max(255).trim(),
  email: emailSchema,
  password: passwordSchema,
  poste: z.string().min(3).max(255).trim(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const activeUserSchema = z.object({
  password: passwordSchema,
  userId: z.string(),
});
