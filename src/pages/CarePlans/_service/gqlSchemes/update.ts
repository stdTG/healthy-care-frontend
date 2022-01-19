import { gql } from '@apollo/client';

export const UPDATE = gql`
  mutation($type: GqlCarePlanType!, $data: CarePlanInput!) {
    carePlan {
      update(type: $type, data: $data) {
        ok
        error {
          message
        }
        resultId
      }
    }
  }
`;
