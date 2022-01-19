import { gql } from '@apollo/client';

export const CARE_TEAM_USER_PAGINATION = gql`
  query(
    $page: Int!
    $perPage: Int!
    $careTeamId: ID!
    $filter: FilterFindManyUser
  ) {
    orgUnit {
      careTeamUserPagination(
        page: $page
        perPage: $perPage
        careTeamId: $careTeamId
        filter: $filter
      ) {
        items {
          id_
          firstName
          lastName
          role
          orgUnit {
            ... on SubOrganization {
              id_
              name
              __typename
            }
            ... on CareTeam {
              id_
              name
              subOrg {
                id_
                name
              }
              __typename
            }
          }
          byEmail {
            email
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
