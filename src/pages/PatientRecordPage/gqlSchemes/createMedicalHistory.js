import { gql } from '@apollo/client';

export const CREATE_MEDICAL_HISTORY = gql`
  mutation($record: MedicalHistoryInput!) {
    patientInfo {
      medicalHistory {
        create(record: $record) {
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
