import { gql } from '@apollo/client';

export const DELETE = gql`
  mutation($type: GqlCarePlanType!, $id_: ID) {
    carePlan {
      delete(type: $type, id_: $id_) {
        ok
        error {
          message
        }
      }
    }
  }
`;
