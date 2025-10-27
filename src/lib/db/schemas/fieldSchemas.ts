import { z } from 'zod';
import { FieldType } from '@/lib/types/formTypes';

export const textFieldSchema = z.object({
    type: z.literal(FieldType.text),
    options: z.object({
        label: z.string(),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
    }),
});

export const numberFieldSchema = z.object({
    type: z.literal(FieldType.number),
    options: z.object({
        label: z.string(),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
        step: z.number().optional(),
    }),
});

export const textareaFieldSchema = z.object({
    type: z.literal(FieldType.textarea),
    options: z.object({
        label: z.string(),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
        rows: z.number().optional(),
    }),
});

export const formFieldSchema = z.union([
    textFieldSchema,
    numberFieldSchema,
    textareaFieldSchema
]);
