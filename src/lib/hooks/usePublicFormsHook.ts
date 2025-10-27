import { gql, useQuery } from '@apollo/client';
import { FormData } from '@/lib/types/formTypes';

export const GET_PUBLIC_FORMS_QUERY = gql`
  query Forms {
    forms {
      id
      name
    }
  }
`;

export const usePublicFormsHook = () => {
    const { data, loading } = useQuery<{
        forms: Pick<FormData, 'id' | 'name'>[]
    }>(GET_PUBLIC_FORMS_QUERY);

    return {
        forms: data?.forms || [],
        isLoading: loading
    };
};