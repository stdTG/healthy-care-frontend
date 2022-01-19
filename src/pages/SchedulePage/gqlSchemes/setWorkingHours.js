import { gql } from '@apollo/client';

export const SET_WORKING_HOURS = gql`
  mutation($workingHours: [WorkingHoursInput!]!) {
    user {
      dashboardUser {
        addHoursMe(record: { workingHours: $workingHours }) {
          ok
          error {
            message
          }
          result {
            workingHours {
              dayOfWeek
              startTime
              endTime
              startLunchTime
              endLunchTime
            }
          }
        }
      }
    }
  }
`;
