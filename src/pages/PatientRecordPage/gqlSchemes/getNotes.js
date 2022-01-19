import { gql } from '@apollo/client';

export const GET_NOTES = gql`
  query($page: Int = 0, $perPage: Int = 10, $patient: ID!) {
    patientInfo {
      note {
        pagination(page: $page, perPage: $perPage, patient: $patient) {
          items {
            id
            title
            content
            createdBy {
              id_
              firstName
              lastName
            }
            patient {
              id_
              firstName
              lastName
            }
            createdAt
            updatedAt
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
