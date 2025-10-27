'use client';

import React, { use } from 'react';
import { FieldRenderer } from '@/components/FieldRenderer';
import { FieldEditorSidebar } from '@/components/FieldEditorSidebar';
import { useFormEditorHook } from '@/lib/hooks/useFormEditorHook';
import { AIChat } from '@/components/AIChat';

export default function FormEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const formId = parseInt(id, 10);
    const {
        currentForm,
        isLoading,
        selectedField,
        handleFieldSelection,
        handleFieldUpdate,
        handleAddNewField,
        handleSidebarClose,
    } = useFormEditorHook(formId);

    if (isLoading || !currentForm) return <p>Loading...</p>;

    return (
        <div className="flex flex-col">
            <div className="flex">
                <div className="w-1/2 p-4">
                    <h1>Preview: {currentForm.name}</h1>
                    {currentForm.fields.map((field) => (
                        <div key={field.id} className="mb-4">
                            <label>{field.options.label}</label>
                            <FieldRenderer
                                field={field}
                                preview
                                onClick={() => handleFieldSelection(field.id)}
                            />
                        </div>
                    ))}
                </div>
                {selectedField && (
                    <FieldEditorSidebar
                        field={selectedField}
                        onSave={handleFieldUpdate}
                        onClose={handleSidebarClose}
                    />
                )}
            </div>
            <AIChat onAddField={handleAddNewField} />
        </div>
    );
}