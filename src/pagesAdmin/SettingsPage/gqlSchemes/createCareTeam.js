import { gql } from '@apollo/client';

export const CREATE_CARE_TEAM = gql`
  mutation($record: CareTeamCreateInput!) {
    orgUnit {
      createCareTeam(record: $record) {
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
