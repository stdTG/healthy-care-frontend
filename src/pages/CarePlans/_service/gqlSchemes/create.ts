import { gql } from '@apollo/client';

export type Create_ResponseData = {
  carePlan: {
    create: {
      ok: boolean
      resultId: string
      error: {
        message: any
      }
    }
  }
}

export const CREATE = gql`
  mutation($type: GqlCarePlanType!, $data: CarePlanInput!) {
    carePlan {
      create(type: $type, data: $data) {
        ok
        error {
          message
        }
        resultId
      }
    }
  }
`;
