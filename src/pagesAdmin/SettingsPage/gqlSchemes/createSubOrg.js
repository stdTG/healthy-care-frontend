import { gql } from '@apollo/client';

export const CREATE_SUB_ORG = gql`
  mutation($record: SubOrgCreateInput!) {
    orgUnit {
      createSubOrg(record: $record) {
        result {
          name
        }
        ok
        resultId
        error {
          message
        }
      }
    }
  }
`;
