import { gql } from '@apollo/client';

export const GET_SUB_ORGS = gql`
  query GET_SUB_ORGS(
    $page: Int!
    $perPage: Int!
    $filter: FilterFindManyOrgUnit
  ) {
    orgUnit {
      subOrgPagination(page: $page, perPage: $perPage, filter: $filter) {
        items {
          id_
          name
          email
          phone
          site
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
          careTeams {
            id_
            name
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
          hasNextPage
        }
      }
    }
  }
`;
