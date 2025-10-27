'use client';

import React from 'react';
import Link from 'next/link';
import { usePublicFormsHook } from '@/lib/hooks/usePublicFormsHook';

export default function HomePage() {
    const { forms, isLoading } = usePublicFormsHook();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Available Forms</h1>
                <Link
                    href="/admin/forms/new"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create New Form
                </Link>
            </div>

            {forms.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No forms available yet</p>
                    <Link
                        href="/admin/forms/new"
                        className="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create Your First Form
                    </Link>
                </div>
            ) : (
                <ul className="space-y-2">
                    {forms.map((form) => (
                        <li key={form.id} className="border p-4 rounded hover:bg-gray-50">
                            <Link href={`/forms/${form.id}`} className="text-blue-600 hover:underline">
                                {form.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
