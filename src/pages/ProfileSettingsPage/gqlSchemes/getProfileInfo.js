import { gql } from '@apollo/client';

export const GET_PROFILE_INFO = gql`
  query {
    user {
      dashboard {
        me {
          id_
          firstName
          lastName
          speciality
          byPhone {
            phone
          }
          byEmail {
            email
          }
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
          fullAddress {
            country
            city
            address
            zipcode
            latitude
            longitude
          }
          sex
          birthDate
          status
        }
      }
    }
  }
`;
