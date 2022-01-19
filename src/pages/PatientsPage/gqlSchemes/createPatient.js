import { gql } from '@apollo/client';

export const CREATE_PATIENT = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $birthDate: Date!
    $sex: SexEnum!
    $byPhone: UserByPhoneInput
    $byEmail: UserByEmailInput
  ) {
    user {
      patientUser {
        create(
          record: {
            firstName: $firstName
            lastName: $lastName
            birthDate: $birthDate
            sex: $sex
            byPhone: $byPhone
            byEmail: $byEmail
          }
        ) {
          ok
          resultId
          result {
            id_
            firstName
            lastName
            birthDate
            sex
          }
          error {
            message
          }
        }
      }
    }
  }
`;
