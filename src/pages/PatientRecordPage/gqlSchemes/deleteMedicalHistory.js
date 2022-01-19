import { gql } from '@apollo/client';

export const DELETE_MEDICAL_HISTORY = gql`
  mutation($id_: ID!) {
    patientInfo {
      medicalHistory {
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
