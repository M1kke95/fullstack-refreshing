import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email()
});



export const UpdateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional()
});

export type CreateUserBody = z.infer<typeof CreateUserSchema>;

export type UpdateUserBody = z.infer<typeof UpdateUserSchema>;