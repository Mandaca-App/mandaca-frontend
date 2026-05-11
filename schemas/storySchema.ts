import { z } from 'zod';

export const storySchema = z.object({
  historia: z
    .string()
    .min(20, 'A história deve ter no mínimo 20 caracteres')
    .max(300, 'A história deve ter no máximo 300 caracteres'),
});

export type StorySchema = z.infer<typeof storySchema>;
