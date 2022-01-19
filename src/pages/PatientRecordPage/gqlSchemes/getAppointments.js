import { gql } from '@apollo/client';

export const GET_APPOINTMENTS = gql`
  query(
    $page: Int = 0
    $perPage: Int = 10
    $filter: FilterFindManyAppointment!
  ) {
    schedule {
      eventPagination(page: $page, perPage: $perPage, filter: $filter) {
        items {
          ... on Appointment {
            id_
            title
            eventType
            isAppointment
            startDate
            endDate
            createdAt
            createdBy {
              id_
              firstName
              lastName
              role
              speciality
            }
            note
            patient {
              id_
              firstName
              lastName
            }
            user {
              id_
              firstName
              lastName
            }
            location {
              name
              id_
            }
          }

          ... on Event {
            id_
            title
            eventType
            isAppointment
            startDate
            endDate
            createdAt
            createdBy {
              id_
              firstName
              lastName
              role
            }
            patients {
              id_
              firstName
              lastName
            }
            users {
              id_
              firstName
              lastName
            }
            location {
              name
              id_
            }
          }
        }
        pageInfo {
          totalPages
          totalItems
        }
      }
    }
  }
`;
