import { gql } from '@apollo/client';

export const GET_MEDICAL_HISTORY = gql`
  query($page: Int = 0, $perPage: Int = 10, $patient: ID!) {
    patientInfo {
      medicalHistory {
        pagination(page: $page, perPage: $perPage, patient: $patient) {
          items {
            id_
            name
            date
            comment
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
