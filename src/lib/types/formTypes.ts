export type TextFieldOptions = {
    label: string;
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
};

export type NumberFieldOptions = {
    label: string;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
};

export type TextareaFieldOptions = {
    label: string;
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    rows?: number;
};

export enum FieldType {
    text = "text",
    number = "number",
    textarea = "textarea"
}

export type FieldOptions = TextFieldOptions | NumberFieldOptions | TextareaFieldOptions;

export interface FormField {
    id: number;
    type: FieldType;
    options: FieldOptions;
    order: number;
}

export interface FormData {
    id: number;
    name: string;
    fields: FormField[];
}

export type FormFieldInput = {
    type: FieldType;
    options: FieldOptions;
    order: number;
};