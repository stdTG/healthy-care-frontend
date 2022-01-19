import { gql } from '@apollo/client';

export const SET_WORKING_HOURS = gql`
  mutation($workingHours: [WorkingHoursInput!]!, $subOrg: ID!) {
    orgUnit {
      addHoursToSubOrg(
        record: { workingHours: $workingHours, subOrg: $subOrg }
      ) {
        ok
        error {
          code
        }
      }
    }
  }
`;
