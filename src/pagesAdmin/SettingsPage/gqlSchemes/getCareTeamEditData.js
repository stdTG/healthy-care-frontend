import { gql } from '@apollo/client';

export const GET_CARE_TEAM_EDIT_DATA = gql`
  query get($page: Int!, $perPage: Int!) {
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
            perPage
            page
            totalItems
            totalPages
          }
        }
      }
    }

    orgUnit {
      subOrgPagination(page: $page, perPage: $perPage) {
        items {
          id_
          name
          email
          phone
          site
          supervisors {
            id_
          }
          users {
            id_
          }
          fullAddress {
            address
            zipcode
            city
            country
          }
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
`;
