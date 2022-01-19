import { gql } from '@apollo/client';

export const GET_LOCATION_STATISTIC = gql`
  query($filter: FilterStatistic) {
    statistics {
      byLocation(filter: $filter) {
        items {
          key
          value
        }
      }
    }
  }
`;
