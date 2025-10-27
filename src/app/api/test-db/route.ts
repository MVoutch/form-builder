import { NextResponse } from 'next/server';
import {db} from "@/lib/db";
import {forms} from "@/lib/db/schema";

export async function GET() {
    try {
        const result = await db.insert(forms).values({
            name: 'Test Form'
        }).returning();

        const allForms = await db.select().from(forms);

        return NextResponse.json({
            success: true,
            inserted: result,
            allForms
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: String(error),
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}