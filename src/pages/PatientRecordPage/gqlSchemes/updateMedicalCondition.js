import { gql } from '@apollo/client';

export const UPDATE_MEDICAL_CONDITION = gql`
  mutation($id_: ID!, $record: MedicalConditionUpdateInput!) {
    patientInfo {
      medicalCondition {
        update(id_: $id_, record: $record) {
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
