import z from "zod";

export const createApiKeySchema = z.object({
  name: z.string().min(2).max(50),
});

export const deleteApiKeySchema = z.object({
  id: z.string().min(1),
});
