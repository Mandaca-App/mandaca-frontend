import { z } from 'zod';

export const accountSchema = z.object({
  nome: z
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Digite um e-mail válido'),

  telefone: z
    .string()
    .min(10, 'Digite um telefone válido (mínimo 10 dígitos)')
    .max(20, 'O telefone é muito longo'),
});

export type AccountFormData = z.infer<typeof accountSchema>;

export const passwordSchema = z
  .object({
    senhaAtual: z.string().min(1, 'A senha atual é obrigatória'),

    novaSenha: z
      .string()
      .min(8, 'A nova senha deve ter no mínimo 8 caracteres')
      .regex(
        /[A-Z]/,
        'A senha deve conter pelo menos uma letra maiúscula',
      )
      .regex(
        /[0-9]/,
        'A senha deve conter pelo menos um número',
      ),

    confirmarSenha: z.string().min(1, 'Confirme a nova senha'),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;
