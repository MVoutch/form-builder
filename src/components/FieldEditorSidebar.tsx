import React, {useEffect} from 'react';
import { useFieldEditorHook } from '@/lib/hooks/useFieldEditorHook';
import {FieldType, FormField, NumberFieldOptions, TextareaFieldOptions, TextFieldOptions} from '@/lib/types/formTypes';
import {SubmitHandler} from "react-hook-form";

interface FieldEditorSidebarProps {
    field: FormField;
    onSave: (updated: FormField) => void;
    onClose: () => void;
}

type FieldFormData = {
    type: FieldType;
    options: TextFieldOptions | TextareaFieldOptions | NumberFieldOptions;
};

export const FieldEditorSidebar: React.FC<FieldEditorSidebarProps> = ({
    field,
    onSave,
    onClose
}) => {
    const { register, handleSubmit, setValue } = useFieldEditorHook(field);

    useEffect(() => {
        setValue('options.label', field.options.label ?? '');
        setValue('options.placeholder', field.options.placeholder ?? '');
        setValue('options.required', field.options.required ?? false);

        if (field.type === 'text' || field.type === 'textarea') {
            setValue('options.minLength', (field.options as TextFieldOptions | TextareaFieldOptions).minLength ?? 0);
            setValue('options.maxLength', (field.options as TextFieldOptions | TextareaFieldOptions).maxLength ?? 20);
        }

        if (field.type === 'number') {
            setValue('options.min', (field.options as NumberFieldOptions).min ?? 0);
            setValue('options.max', (field.options as NumberFieldOptions).max ?? 100);
            setValue('options.step', (field.options as NumberFieldOptions).step ?? 1);
        }

        if (field.type === 'textarea') {
            setValue('options.rows', (field.options as TextareaFieldOptions).rows ?? 3);
        }
    }, [field, setValue]);

    const onSubmit: SubmitHandler<FieldFormData> = (data) => {
        const updatedField: FormField = {
            id: field.id,
            order: field.order,
            type: data.type,
            options: data.options,
        };

        onSave(updatedField);
        onClose();
    };

    const isTextOrTextarea = field.type === 'text' || field.type === 'textarea';
    const isNumber = field.type === 'number';
    const isTextarea = field.type === 'textarea';

    return (
        <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Edit Field
                </h2>
                <button
                    onClick={onClose}
                    className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    ✕
                </button>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex-1 overflow-y-auto p-4 space-y-3"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Label
                    </label>
                    <input
                        {...register("options.label")}
                        placeholder="Label"
                        defaultValue={field.options.label ?? ""}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Placeholder
                    </label>
                    <input
                        {...register("options.placeholder")}
                        placeholder="Placeholder"
                        defaultValue={field.options.placeholder ?? ""}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                        type="checkbox"
                        {...register("options.required")}
                        checked={field.options.required ?? false}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    Required
                </label>

                {isTextOrTextarea && (
                    <>
                        <input
                            type="number"
                            {...register("options.minLength", { valueAsNumber: true })}
                            placeholder="Min Length"
                            defaultValue={(field.options as TextFieldOptions | TextareaFieldOptions).minLength ?? 0}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            {...register("options.maxLength", { valueAsNumber: true })}
                            placeholder="Max Length"
                            defaultValue={(field.options as TextFieldOptions | TextareaFieldOptions).minLength ?? 20}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </>
                )}

                {isNumber && (
                    <>
                        <input
                            type="number"
                            {...register("options.min", { valueAsNumber: true })}
                            placeholder="Min"
                            defaultValue={(field.options as NumberFieldOptions).min ?? 0}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            {...register("options.max", { valueAsNumber: true })}
                            placeholder="Max"
                            defaultValue={(field.options as NumberFieldOptions).max ?? 100}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            {...register("options.step", { valueAsNumber: true })}
                            placeholder="Step"
                            defaultValue={(field.options as NumberFieldOptions).step ?? 1}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </>
                )}

                {isTextarea && (
                    <input
                        type="number"
                        {...register("options.rows", { valueAsNumber: true })}
                        placeholder="Rows"
                        defaultValue={(field.options as TextareaFieldOptions).rows ?? 3}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}

                <button
                    onClick={() => handleSubmit(onSubmit)}
                    className="w-full mt-4 rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Save
                </button>
            </form>
        </div>
    );
};
