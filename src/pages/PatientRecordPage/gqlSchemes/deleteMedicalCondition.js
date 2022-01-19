import { gql } from '@apollo/client';

export const DELETE_MEDICAL_CONDITION = gql`
  mutation($id_: ID!) {
    patientInfo {
      medicalCondition {
        delete(id_: $id_) {
          ok
          error {
            message
          }
        }
      }
    }
  }
`;
