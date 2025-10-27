import { z } from "zod";

export const textFieldSchema = z.object({
    type: z.literal("text"),
    options: z.object({
        label: z.string(),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
    }),
});

export const numberFieldSchema = z.object({
    type: z.literal("number"),
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
    type: z.literal("textarea"),
    options: z.object({
        label: z.string(),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
        rows: z.number().optional(),
    }),
});

export const fieldSchema = z.union([textFieldSchema, numberFieldSchema, textareaFieldSchema]);

export const formSchema = z.object({
    name: z.string().min(1),
    fields: z.array(fieldSchema),
});