import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  passwordHash: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string().min(6),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});
