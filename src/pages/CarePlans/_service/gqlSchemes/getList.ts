import { gql } from '@apollo/client';
import { CarePlan, PagedListInfo } from '../../models';

export type GetList_ResponseData = {
  carePlan: {
    list: {
      items: CarePlan[]
      pageInfo: PagedListInfo
    }
  }
}

export const GET_LIST = gql`
  query($type: GqlCarePlanType, $page: Int!, $perPage: Int!) {
    carePlan {
      list(type: $type, page: $page, perPage: $perPage) {
        items {
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
            uiJson
        }
        pageInfo {
          totalPages
          totalItems
          page
          perPage
        }
      }
    }
  }
`;
