import { gql } from '@apollo/client';
import { CarePlan } from '../../models';

export type GetOne_ResponseData = {
  carePlan: {
    one: CarePlan
  }
}

export const GET_ONE = gql`
  query($type: GqlCarePlanType, $id_: ID) {
    carePlan {
      one(type: $type, id_: $id_) {
        id_
        name
        subtitle
        description
        image
        durationMonths
        durationWeeks
        durationDays
        authorId
        tags
        revision
        status
        awsStateMachineArn
      }
    }
  }
`;
