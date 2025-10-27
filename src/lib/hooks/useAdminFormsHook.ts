import { useQuery, useMutation, gql } from '@apollo/client';
import { FormData } from '@/lib/types/formTypes';

export const GET_ALL_FORMS_QUERY = gql`
  query Forms {
    forms {
      id
      name
    }
  }
`;

export const DELETE_FORM_MUTATION = gql`
  mutation DeleteForm($id: Int!) {
    deleteForm(id: $id)
  }
`;

export const useAdminFormsHook = () => {
    const { data, loading, refetch } = useQuery<{
        forms: Pick<FormData, 'id' | 'name'>[]
    }>(GET_ALL_FORMS_QUERY);

    const [deleteForm] = useMutation(DELETE_FORM_MUTATION, { onCompleted: refetch });

    return {
        forms: data?.forms || [],
        isLoading: loading, deleteForm,
        refetchForms: refetch
    };
};