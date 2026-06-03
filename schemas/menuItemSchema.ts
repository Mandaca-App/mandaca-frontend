// schemas/menuItemSchema.ts

import { z } from 'zod';

export const categoryOptions = [
    {
        label: 'Entrada',
        value: 'entrada',
    },
    {
        label: 'Prato principal',
        value: 'prato_principal',
    },
    {
        label: 'Sobremesa',
        value: 'sobremesa',
    },
    {
        label: 'Bebida',
        value: 'bebida',
    },
    {
        label: 'Lanche',
        value: 'lanche',
    },
] as const;

export const menuItemSchema =
    z.object({
        descricao: z
            .string()
            .min(
                3,
                'Digite o nome do prato',
            ),

        descricaoCurta: z
            .string()
            .optional(),

        historia: z
            .string()
            .min(
                3,
                'Digite a história do prato',
            ),

        preco: z
            .string()
            .min(
                1,
                'Digite o preço',
            ),

        categoria: z.enum([
            'entrada',
            'prato_principal',
            'sobremesa',
            'bebida',
            'lanche',
        ]),

        foto: z
            .string()
            .nullable()
            .optional(),
    });

export type MenuItemFormData =
    z.infer<
        typeof menuItemSchema
    >;