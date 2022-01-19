import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
  mutation($record: AppointmentCreateInput!) {
    schedule {
      createAppointment(record: $record) {
        ok
        error {
          code
        }
        result {
          id_
          title
          isOnline
          eventType
          startDate
          endDate
          createdAt
          isAppointment
          note
          patient {
            status
            id_
            firstName
            lastName
            sex
            birthDate
          }
          createdBy {
            status
            id_
            firstName
            lastName
            sex
            birthDate
          }
          user {
            id_
            firstName
            lastName
            sex
            birthDate
            status
          }
        }
      }
    }
  }
`;
