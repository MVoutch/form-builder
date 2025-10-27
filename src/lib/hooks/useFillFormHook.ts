"use client"

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormData } from '@/lib/types/formTypes';

export const GET_FILL_FORM_QUERY = gql`
  query GetForm($id: Int!) {
    form(id: $id) {
      id
      name
      fields {
        id
        type
        options
      }
    }
  }
`;

export const useFillFormHook = (formId: number) => {
    const { data, loading } = useQuery<{
        form: Pick<FormData, 'id' | 'name' | 'fields'>
    }>(GET_FILL_FORM_QUERY, { variables: { id: formId } });
    const formHook = useForm<Record<string, string | number>>();

    const [submittedData, setSubmittedData] = useState<Record<string, string | number> | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleFormSubmission = (data: Record<string, string | number>) => {
        setSubmittedData(data);
        setIsModalVisible(true);
    };

    const closeModal = () => setIsModalVisible(false);

    return {
        currentForm: data?.form,
        isLoading: loading,
        formHook,
        isModalVisible,
        submittedData,
        handleFormSubmission: formHook.handleSubmit(handleFormSubmission),
        closeModal,
    };
};