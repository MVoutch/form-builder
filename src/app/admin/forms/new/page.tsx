"use client"

import React from 'react';
import { useCreateFormHook } from '@/lib/hooks/useCreateFormHook';

export default function NewFormPage() {
    const {
        formHook: { register, handleSubmit },
        handleFormSubmission
    } = useCreateFormHook();

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Create a New Form</h2>

            <form onSubmit={handleSubmit(handleFormSubmission)} className="space-y-4">
                <input
                    {...register('name')}
                    placeholder="Form name"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Create
                </button>
            </form>
        </div>
    );
}