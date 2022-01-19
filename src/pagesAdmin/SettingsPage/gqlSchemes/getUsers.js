import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers(
    $page: Int!
    $perPage: Int!
    $filter: FilterFindManyUserInput
  ) {
    user {
      dashboard {
        pagedList(page: $page, perPage: $perPage, filter: $filter) {
          items {
            id_
            firstName
            lastName
            role
            orgUnit {
              ... on CareTeam {
                id_
                name
                subOrg {
                  id_
                  name
                }
              }
              ... on SubOrganization {
                id_
                name
              }
            }
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
  }
`;
