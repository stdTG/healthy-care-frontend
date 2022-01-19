import { gql } from '@apollo/client';

export const GET_PATIENTS = gql`
  query($page: Int!, $perPage: Int!, $filter: FilterFindManyPatientInput) {
    user {
      patient {
        pagedList(page: $page, perPage: $perPage, filter: $filter) {
          items {
            id_
            firstName
            lastName
            sex
            birthDate
          }
          pageInfo {
            perPage
            page
            totalItems
            totalPages
            hasNextPage
          }
        }
      }
    }
  }
`;
