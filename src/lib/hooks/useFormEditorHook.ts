import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { FormData, FormField, FormFieldInput } from '@/lib/types/formTypes';

export const GET_FORM_QUERY = gql`
  query GetForm($id: Int!) {
    form(id: $id) {
      id
      name
      fields {
        id
        type
        options
        order
      }
    }
  }
`;

export const UPDATE_FORM_MUTATION = gql`
  mutation UpdateForm($id: Int!, $name: String, $fields: [FieldInput!]!) {
    updateForm(id: $id, name: $name, fields: $fields) {
      id
      name
      fields {
        id
        type
        options
        order
      }
    }
  }
`;

const cleanFieldForInput = (field: FormField): FormFieldInput => ({
    type: field.type,
    options: field.options,
    order: field.order,
});

export const useFormEditorHook = (formId: number) => {
    const { data, loading } = useQuery<{ form: FormData }>(GET_FORM_QUERY, {
        variables: { id: formId },
        skip: !formId
    });
    const [updateForm] = useMutation<{ updateForm: FormData }>(UPDATE_FORM_MUTATION);
    const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);

    const currentForm = data?.form;
    const selectedField = currentForm?.fields.find((field) => field.id === selectedFieldId);

    const handleFieldSelection = (fieldId: number) => setSelectedFieldId(fieldId);

    const handleFieldUpdate = (updatedField: FormField) => {
        if (!currentForm) return;

        const updatedFields = currentForm.fields.map((field) =>
            field.id === updatedField.id ? updatedField : field,
        );

        const cleanedFields = updatedFields.map(cleanFieldForInput);

        updateForm({
            variables: {
                id: currentForm.id,
                fields: cleanedFields
            }
        });
        setSelectedFieldId(null);
    };

    const handleAddNewField = (newField: Omit<FormField, 'id' | 'order'>) => {
        if (!currentForm) return;

        const newFields: FormFieldInput[] = [
            ...currentForm.fields.map(cleanFieldForInput),
            { ...newField, order: currentForm.fields.length + 1 },
        ];

        updateForm({
            variables: {
                id: currentForm.id,
                fields: newFields
            }
        });
    };

    const handleSidebarClose = () => setSelectedFieldId(null);

    return {
        currentForm,
        isLoading: loading,
        selectedField,
        handleFieldSelection,
        handleFieldUpdate,
        handleAddNewField,
        handleSidebarClose,
    };
};
