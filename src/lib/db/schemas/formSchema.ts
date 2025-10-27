import { z } from 'zod';
import { formFieldSchema } from './fieldSchemas';

export const createFormSchema = z.object({
    name: z.string().min(1),
    fields: z.array(formFieldSchema),
});
