import { gql } from '@apollo/client';

export const UPDATE_PROFILE_INFO = gql`
  mutation($record: DashboardUserUpdateMeInput!) {
    user {
      dashboardUser {
        updateMe(record: $record) {
          result {
            language
            role
            orgUnit {
              ... on CareTeam {
                id_
                name
                __typename
                subOrg {
                  id_
                  name
                }
              }
              ... on SubOrganization {
                id_
                name
                __typename
              }
            }
            speciality
            description
            title
            memberSince
            firstName
            lastName
            birthDate
            fullAddress {
              city
              address
              country
              zipcode
            }
          }
          error {
            message
          }
        }
      }
    }
  }
`;
