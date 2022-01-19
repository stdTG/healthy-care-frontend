import { gql } from '@apollo/client';

export const GET_WORKING_HOURS = gql`
  query {
    user {
      dashboard {
        me {
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
`;
