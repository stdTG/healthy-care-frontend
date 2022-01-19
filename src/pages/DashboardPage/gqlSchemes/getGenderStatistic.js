import { gql } from '@apollo/client';

export const GET_GENDER_STATISTIC = gql`
  query($filter: FilterStatistic) {
    statistics {
      byGender(filter: $filter) {
        items {
          key
          value
        }
      }
    }
  }
`;
