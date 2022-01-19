import { gql } from '@apollo/client';

export const GET_TIME_SLOTS = gql`
  query($filter: FilterFindManyTimeSlot!) {
    schedule {
      timeslotMany(filter: $filter) {
        items {
          startTime
          endTime
        }
      }
    }
  }
`;
