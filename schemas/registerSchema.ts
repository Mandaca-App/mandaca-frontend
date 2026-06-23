import { z } from 'zod';

export const registerSchema = z.object({
    email: z
        .string()
        .min(3, 'E-mail é obrigatório')
        .max(255, 'E-mail muito longo')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Formato de e-mail inválido')
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .max(128, 'A senha deve ter no máximo 128 caracteres')
        .refine(
            (v) =>
                /[a-z]/.test(v) &&
                /[A-Z]/.test(v) &&
                /\d/.test(v) &&
                /[^A-Za-z0-9]/.test(v),
            'A senha deve conter letra maiúscula, minúscula, número e símbolo',
        ),

    confirmPassword: z.string(),

    nome: z
        .string()
        .trim()
        .min(1, 'Nome é obrigatório')
        .max(255, 'Nome muito longo'),

    cpf: z
        .string()
        .trim()
        .length(11, 'CPF deve ter exatamente 11 dígitos')
        .regex(/^\d{11}$/, 'CPF deve conter apenas números'),
});

export const registerFormSchema = registerSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    },
);

export type RegisterFormData = z.infer<typeof registerSchema>;
