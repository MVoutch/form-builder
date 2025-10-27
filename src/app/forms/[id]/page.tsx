'use client';

import React from 'react';
import { FieldRenderer } from '@/components/FieldRenderer';
import { useFillFormHook } from '@/lib/hooks/useFillFormHook';
import { FormField } from '@/lib/types/formTypes';
import { Controller } from 'react-hook-form';

export default function FillFormPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const formId = parseInt(id, 10);

    const {
        currentForm,
        isLoading,
        isModalVisible,
        submittedData,
        formHook,
        handleFormSubmission,
        closeModal
    } = useFillFormHook(formId);

    if (isLoading || !currentForm) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">{currentForm.name}</h2>

            <form onSubmit={handleFormSubmission} className="space-y-4 bg-white p-6 rounded-lg shadow-md border">
                {currentForm.fields.map((field: FormField) => (
                    <div key={field.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.options.label}</label>
                        <Controller
                            name={`${field.options.label}`}
                            control={formHook.control}
                            defaultValue={field.type === 'number' ? 0 : ''}
                            render={({ field: controllerField }) => (
                                <FieldRenderer
                                    field={field}
                                    value={controllerField.value}
                                    onChange={controllerField.onChange}
                                />
                            )}
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>

            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-lg font-semibold mb-4">Confirm Data</h2>
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                            {JSON.stringify(submittedData, null, 2)}
                        </pre>
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
