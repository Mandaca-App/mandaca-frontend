import { z } from 'zod';

export const nameSchema = z.object({
  nome: z
    .string()
    .min(3, 'O nome da empresa deve ter no mínimo 3 caracteres')
    .max(100, 'O nome da empresa deve ter no máximo 100 caracteres'),
});

export const specialtySchema = z.object({
  especialidade: z
    .string()
    .min(3, 'A especialidade deve ter no mínimo 3 caracteres')
    .max(100, 'A especialidade deve ter no máximo 100 caracteres'),
});

export const addressSchema = z.object({
  endereco: z
    .string()
    .min(5, 'O endereço deve ter no mínimo 5 caracteres')
    .max(150, 'O endereço deve ter no máximo 150 caracteres'),
});

export const phoneSchema = z.object({
  telefone: z
    .string()
    .min(10, 'Digite um telefone válido')
    .max(20, 'O telefone é muito longo'),
});

export const openHourSchema = z.object({
  hora_abrir: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora de abertura inválida'),
});

export const closeHourSchema = z.object({
  hora_fechar: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora de fechamento inválida'),
});

export const storySchema = z.object({
  historia: z
    .string()
    .min(20, 'A história deve ter no mínimo 20 caracteres')
    .max(300, 'A história deve ter no máximo 300 caracteres'),
});

export type StorySchema = z.infer<typeof storySchema>;
