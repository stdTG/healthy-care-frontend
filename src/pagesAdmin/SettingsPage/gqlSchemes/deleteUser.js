import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation($id_: ID!) {
    user {
      dashboardUser {
        delete(id_: $id_) {
          ok
          error {
            message
          }
        }
      }
    }
  }
`;
