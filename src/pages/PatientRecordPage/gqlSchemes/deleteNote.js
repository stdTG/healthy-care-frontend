import { gql } from '@apollo/client';

export const DELETE_NOTE = gql`
  mutation($id_: ID!) {
    patientInfo {
      note {
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
