import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query($page: Int!, $perPage: Int!) {
    user {
      dashboard {
        pagedList(page: $page, perPage: $perPage) {
          items {
            id_
            firstName
            lastName
            byEmail {
              email
            }
          }
          pageInfo {
            page
            perPage
            totalItems
            totalPages
          }
        }
      }
    }
  }
`;
