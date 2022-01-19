import { gql } from '@apollo/client';

export const GET_CARE_TEAM_BY_ID = gql`
  query($id: ID!) {
    orgUnit {
      careTeamById(id_: $id) {
        name
      }
    }
  }
`;
