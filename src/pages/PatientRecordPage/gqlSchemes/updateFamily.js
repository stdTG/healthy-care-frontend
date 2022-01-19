import { gql } from '@apollo/client';

export const UPDATE_FAMILY = gql`
  mutation($patient: ID!, $record: FamilyInput!) {
    user {
      patientUser {
        updateFamily(patient: $patient, record: $record) {
          ok
          result {
            family {
              mother
              father
              grandparents
            }
          }
          error {
            message
          }
        }
      }
    }
  }
`;
