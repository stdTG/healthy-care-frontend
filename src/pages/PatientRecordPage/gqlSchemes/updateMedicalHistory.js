import { gql } from '@apollo/client';

export const UPDATE_MEDICAL_HISTORY = gql`
  mutation($id_: ID!, $record: MedicalHistoryUpdateInput!) {
    patientInfo {
      medicalHistory {
        update(id_: $id_, record: $record) {
          result {
            id_
            name
            date
            comment
          }
          ok
          error {
            message
          }
        }
      }
    }
  }
`;
