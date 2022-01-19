import { gql } from '@apollo/client';

export const CREATE_NOTE = gql`
  mutation($record: NoteCreateInput!) {
    patientInfo {
      note {
        create(record: $record) {
          result {
            id
            title
            content
            createdBy {
              id_
              firstName
              lastName
            }
            patient {
              id_
              firstName
              lastName
            }
            createdAt
            updatedAt
          }
          ok
          error {
            message
          }
        }
      }
    }
  }
`;
