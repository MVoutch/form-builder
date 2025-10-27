import React from 'react';
import { FieldType, TextFieldOptions, NumberFieldOptions, TextareaFieldOptions } from '@/lib/types/formTypes';

export type TextFormField = {
    id: number;
    type: FieldType.text;
    options: TextFieldOptions;
    order: number;
};

export type NumberFormField = {
    id: number;
    type: FieldType.number;
    options: NumberFieldOptions;
    order: number;
};

export type TextareaFormField = {
    id: number;
    type: FieldType.textarea;
    options: TextareaFieldOptions;
    order: number;
};

export type FormField = TextFormField | NumberFormField | TextareaFormField;

interface FieldRendererProps {
    field: FormField;
    preview?: boolean;
    onClick?: () => void;
    onChange?: (val: string | number) => void;
    value?: string | number;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
    field,
    preview,
    onClick,
    onChange,
    value,
}) => {
    const { type, options } = field;

    const baseClasses =
        "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 " +
        "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 " +
        "focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 " +
        "placeholder:text-gray-400 dark:placeholder:text-gray-500";

    const hoverable = preview
        ? "cursor-pointer hover:border-blue-400 hover:shadow-sm"
        : "";

    const commonProps = {
        className: `${baseClasses} ${hoverable}`,
        placeholder: options.placeholder,
        required: options.required,
        onClick: preview ? onClick : undefined,
    };

    switch (type) {
        case FieldType.text:
            return (
                <div className="flex flex-col gap-1">
                    {options.label && (
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {options.label}
                        </label>
                    )}
                    <input
                        type="text"
                        {...commonProps}
                        defaultValue={value as string || ''}
                        onChange={e => onChange?.(e.target.value)}
                        minLength={options.minLength}
                        maxLength={options.maxLength}
                    />
                </div>
            );

        case FieldType.number:
            return (
                <div className="flex flex-col gap-1">
                    {options.label && (
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {options.label}
                        </label>
                    )}
                    <input
                        type="number"
                        {...commonProps}
                        defaultValue={value as number || 0}
                        onChange={e => onChange?.(Number(e.target.value))}
                        min={options.min}
                        max={options.max}
                        step={options.step}
                    />
                </div>
            );

        case FieldType.textarea:
            return (
                <div className="flex flex-col gap-1">
                    {options.label && (
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {options.label}
                        </label>
                    )}
                    <textarea
                        {...commonProps}
                        defaultValue={value as string || ''}
                        onChange={e => onChange?.(e.target.value)}
                        minLength={options.minLength}
                        maxLength={options.maxLength}
                        rows={options.rows || 3}
                        className={`${baseClasses} resize-none ${hoverable}`}
                    />
                </div>
            );

        default:
            return null;
    }
};