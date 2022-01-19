import { gql } from '@apollo/client';

export const SUB_ORG_USER_PAGINATION = gql`
  query(
    $page: Int!
    $perPage: Int!
    $subOrgId: ID!
    $filter: FilterFindManyUser
  ) {
    orgUnit {
      subOrgUserPagination(
        page: $page
        perPage: $perPage
        subOrgId: $subOrgId
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
              __typename
              subOrg {
                id_
                name
              }
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
