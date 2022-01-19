import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query {
    user {
      dashboard {
        me {
          id_
          firstName
          lastName
          orgUnit {
            ... on CareTeam {
              id_
              __typename
            }
            ... on SubOrganization {
              id_
              __typename
            }
            __typename
          }
        }
      }
    }
  }
`;
