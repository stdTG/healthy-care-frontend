import { gql } from '@apollo/client';

export const CREATE_MEDICAL_CONDITION = gql`
  mutation($record: MedicalConditionInput!) {
    patientInfo {
      medicalCondition {
        create(record: $record) {
          result {
            id_
            name
            startDate
            endDate
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
