import { gql } from '@apollo/client';

export const GET_MEDICAL_CONDITIONS = gql`
  query($page: Int = 0, $perPage: Int = 10, $patient: ID!) {
    patientInfo {
      medicalCondition {
        pagination(page: $page, perPage: $perPage, patient: $patient) {
          items {
            id_
            name
            startDate
            endDate
          }
          pageInfo {
            totalPages
            totalItems
            page
            perPage
          }
        }
      }
    }
  }
`;
