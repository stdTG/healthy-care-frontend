import { gql } from '@apollo/client';

export const DELETE_USER_IN_ORG_UNIT = gql`
  mutation($record: AddUserToOrgUnitInput!) {
    orgUnit {
      deleteUsers(record: $record) {
        ok
        error {
          message
        }
        record {
          ... on CareTeam {
            id_
          }
          ... on SubOrganization {
            id_
          }
        }
      }
    }
  }
`;
