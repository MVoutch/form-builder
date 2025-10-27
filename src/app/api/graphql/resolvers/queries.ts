import { db} from "@/lib/db";
import { forms, fields } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { FormField } from '@/lib/types/formTypes';

export const fetchAllForms = async () => {
    const formList = await db.select().from(forms);

    return Promise.all(
        formList.map(async (formRecord) => ({
            ...formRecord,
            fields: (await db
                .select()
                .from(fields)
                .where(eq(fields.formId, formRecord.id))
                .orderBy(asc(fields.order))) as FormField[],
        })),
    );
};


export const fetchFormById = async (_parent: unknown, { id }: { id: number }) => {
    const formRecord = await db.query.forms.findFirst({
        where: eq(forms.id, id)
    });

    if (!formRecord) return null;

    const fieldList = (await db
        .select()
        .from(fields)
        .where(eq(fields.formId, id))
        .orderBy(asc(fields.order))) as FormField[];

    return { ...formRecord, fields: fieldList };
};

export const queries = {
    forms: fetchAllForms,
    form: fetchFormById,
};