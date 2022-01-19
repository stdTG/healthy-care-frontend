import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query($filter: FilterFindManyAppointment!) {
    schedule {
      eventMany(filter: $filter) {
        items {
          ... on Appointment {
            id_
            title
            eventType
            location {
              id_
              name
            }
            startDate
            endDate
            createdAt
            isAppointment
            patient {
              status
              id_
              firstName
              lastName
              sex
              birthDate
            }
            user {
              status
              id_
              firstName
              lastName
              sex
              birthDate
            }
          }
          ... on Event {
            id_
            title
            eventType
            location {
              id_
            }
            startDate
            endDate
            createdAt
            patients {
              status
              id_
              firstName
              lastName
              sex
              birthDate
            }
            users {
              status
              id_
              firstName
              lastName
              sex
              birthDate
            }
            isAppointment
          }
        }
      }
    }
  }
`;
