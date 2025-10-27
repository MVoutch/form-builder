"use client";

import React from 'react';
import Link from 'next/link';
import { useAdminFormsHook } from '@/lib/hooks/useAdminFormsHook';

export default function AdminFormsPage() {
    const {
        forms,
        isLoading,
        deleteForm
    } = useAdminFormsHook();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Your Forms</h2>
                <Link
                    href="/admin/forms/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    + Create Form
                </Link>
            </div>

            <ul className="space-y-3">
                {forms.map((form) => (
                    <li
                        key={form.id}
                        className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center hover:shadow-md transition"
                    >
                        <div>
                            <p className="font-medium">{form.name}</p>
                            <p className="text-sm text-gray-500">ID: {form.id}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <>
                                <Link
                                    href={`/forms/${form.id}`}
                                    className="px-3 py-1.5 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                                >
                                    View
                                </Link>
                                <Link
                                    href={`/admin/forms/${form.id}`}
                                    className="px-3 py-1.5 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteForm({variables: {id: form.id}})}
                                    className="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                                >
                                    Delete
                                </button>
                            </>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}