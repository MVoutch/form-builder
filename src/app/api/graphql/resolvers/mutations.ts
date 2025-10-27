import { eq } from 'drizzle-orm';
import { FormData, FormField, FormFieldInput } from '@/lib/types/formTypes';
import { createFormSchema } from '@/lib/db/schemas/formSchema';
import {db} from "@/lib/db";
import {fields, forms} from '@/lib/db/schema';
import {formFieldSchema} from "@/lib/db/schemas/fieldSchemas";

export const createNewForm = async (_parent: unknown, { name, fields: inputFields }: { name: string; fields: FormFieldInput[] }): Promise<FormData> => {
    const validated = createFormSchema.parse({ name, fields: inputFields });
    const [newForm] = await db.insert(forms).values({ name }).returning();

    const fieldInserts = validated.fields.map((field, index) => ({
        formId: newForm.id,
        type: field.type,
        options: field.options,
        order: index + 1,
    }));

    const insertedFields = fieldInserts.length > 0
        ? (await db.insert(fields).values(fieldInserts).returning()) as FormField[]
        : [];

    return { ...newForm, fields: insertedFields };
};

export const updateExistingForm = async (_parent: unknown, { id, name, fields: inputFields }: { id: number; name?: string; fields: FormFieldInput[] }): Promise<FormData> => {
    const validatedFields = inputFields.map((field) => formFieldSchema.parse(field));

    if (name !== undefined) {
        await db.update(forms).set({ name }).where(eq(forms.id, id));
    }

    await db.delete(fields).where(eq(fields.formId, id));

    const fieldInserts = validatedFields.map((field, index) => ({
        formId: id,
        type: field.type,
        options: field.options,
        order: index + 1,
    }));

    const insertedFields = (await db.insert(fields).values(fieldInserts).returning()) as FormField[];
    const updatedFormRecord = await db.query.forms.findFirst({ where: eq(forms.id, id) });

    if (!updatedFormRecord) throw new Error('Form not found');

    return { ...updatedFormRecord, fields: insertedFields };
};

export const deleteFormById = async (_parent: unknown, { id }: { id: number }): Promise<boolean> => {
    await db.delete(fields).where(eq(fields.formId, id));
    await db.delete(forms).where(eq(forms.id, id));
    return true;
};

export const mutations = {
    createForm: createNewForm,
    updateForm: updateExistingForm,
    deleteForm: deleteFormById,
};