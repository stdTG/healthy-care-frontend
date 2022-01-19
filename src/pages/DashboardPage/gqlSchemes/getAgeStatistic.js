import { gql } from '@apollo/client';

export const GET_AGE_STATISTIC = gql`
  query($filter: FilterStatistic) {
    statistics {
      byAge(filter: $filter) {
        items {
          key
          value
        }
      }
    }
  }
`;
