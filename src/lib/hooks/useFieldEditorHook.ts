"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formFieldSchema } from '@/lib/db/schemas/fieldSchemas';
import { FormField } from '@/lib/types/formTypes';
import {z} from "zod";


export const useFieldEditorHook = (defaultValues: FormField) => {
    return useForm<z.infer<typeof formFieldSchema>>({
        resolver: zodResolver(formFieldSchema),
        defaultValues: {
            type: defaultValues.type,
            options: defaultValues.options,
        },
    });
};