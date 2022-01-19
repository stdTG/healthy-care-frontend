import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $byPhone: UserByPhoneInput
    $byEmail: UserByEmailInput
    $orgUnitId: ID
    $role: RoleEnum!
  ) {
    user {
      dashboardUser {
        create(
          record: {
            firstName: $firstName
            lastName: $lastName
            byPhone: $byPhone
            byEmail: $byEmail
            orgUnitId: $orgUnitId
            role: $role
          }
        ) {
          ok
          resultId
          error {
            code
            message
          }
        }
      }
    }
  }
`;
