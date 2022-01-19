import { gql } from '@apollo/client';

export const GET_SUB_ORG_BY_ID = gql`
  query($id: ID!) {
    orgUnit {
      subOrgById(id_: $id) {
        name
      }
    }
  }
`;
