import { z } from "zod";

export const CreateTaskSchema = z.object({
    taskname: z.string().min(2).max(50),
    description: z.string().min(5).max(500),
    userId: z.number()
});

export const UpdateTaskSchema = z.object({
    taskname: z.string().min(2).max(50).optional(),
    description: z.string().min(5).max(500).optional()
}); 