import { gql } from '@apollo/client';

export const UPDATE_SUB_ORG = gql`
  mutation($record: SubOrgUpdateInput!) {
    orgUnit {
      updateSubOrg(record: $record) {
        ok
        error {
          code
        }
      }
    }
  }
`;
