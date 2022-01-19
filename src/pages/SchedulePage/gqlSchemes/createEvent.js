import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation($record: EventCreateInput!) {
    schedule {
      createEvent(record: $record) {
        ok
        error {
          code
        }
        result {
          id_
          title
          eventType
          startDate
          endDate
          createdAt
          isAppointment
          patients {
            id_
            status
            firstName
            lastName
          }
          createdBy {
            status
            id_
            firstName
            lastName
            sex
            birthDate
          }
          users {
            id_
            firstName
            lastName
            status
          }
        }
      }
    }
  }
`;
