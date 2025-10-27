"use client"

import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFormSchema } from '@/lib/db/schemas/formSchema';
import { z } from 'zod';

export const CREATE_FORM_MUTATION = gql`
  mutation CreateForm($name: String!, $fields: [FieldInput!]!) {
    createForm(name: $name, fields: $fields) {
      id
    }
  }
`;

export type CreateFormInput = z.infer<typeof createFormSchema>;

export const useCreateFormHook = () => {
    const [createForm] = useMutation<{
        createForm: { id: number }
    }>(CREATE_FORM_MUTATION);

    const router = useRouter();

    const formHook = useForm<CreateFormInput>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            name: '',
            fields: [],
        },
    });

    const handleFormSubmission = async (data: CreateFormInput) => {
        const { data: response } = await createForm({ variables: data });

        router.push(`/admin/forms/${response?.createForm.id}`);
    };

    return { formHook, handleFormSubmission };
};