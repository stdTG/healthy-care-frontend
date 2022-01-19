import { gql } from '@apollo/client';

export const UPDATE_CARE_TEAM = gql`
  mutation($record: CareTeamUpdateInput!) {
    orgUnit {
      updateCareTeam(record: $record) {
        ok
        error {
          message
        }
        result {
          id_
          name
          subOrg {
            id_
            name
          }
          users {
            id_
            firstName
            lastName
          }
          supervisors {
            id_
            firstName
            lastName
          }
        }
      }
    }
  }
`;
