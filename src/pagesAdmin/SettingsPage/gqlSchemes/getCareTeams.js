import { gql } from '@apollo/client';

export const GET_CARE_TEAMS = gql`
  query($page: Int!, $perPage: Int!, $filter: FilterFindManyCareTeam) {
    orgUnit {
      careTeamPagination(page: $page, perPage: $perPage, filter: $filter) {
        items {
          id_
          subOrg {
            id_
            name
          }
          name
          supervisors {
            id_
            firstName
            sex
            lastName
            birthDate
          }
          users {
            id_
          }
        }
        pageInfo {
          totalPages
          totalItems
          page
          perPage
          hasNextPage
        }
      }
    }
  }
`;
