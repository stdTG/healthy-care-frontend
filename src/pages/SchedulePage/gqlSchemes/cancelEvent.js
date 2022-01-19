import { gql } from '@apollo/client';

export const CANCEL_EVENT = gql`
  mutation($id: ID!) {
    schedule {
      cancelEvent(id_: $id) {
        ok
        error {
          code
        }
      }
    }
  }
`;
