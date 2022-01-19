import { gql } from '@apollo/client';

export const GET_WORKING_HOURS = gql`
  query($id: ID!) {
    orgUnit {
      subOrgById(id_: $id) {
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
`;
