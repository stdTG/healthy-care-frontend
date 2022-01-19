import { BuilderParts, CarePlanStatus, CarePlanType } from './constants';
import { bool } from 'prop-types';
import { GqlCarePlanType } from '../../generated/graphql';

export type CarePlan = {
  id_?: string
  name?: string
  subtitle?: string
  description?: string
  image?: string
  durationMonths?: number
  durationWeeks?: number
  durationDays?: number
  authorId?: string
  tags?: string[]
  revision?: number
  status?: CarePlanStatus
  awsStateMachineArn?: string
  uiJson?: string
}

export type Variable = {
  id: string
  variableName: string
}
export type CarePlanListArguments = {
  type: CarePlanType,
  page: number
  pageSize: number
}

export type BuilderContainer = {
  current: BuilderParts
}

export type CarePlansContainer = {
  items: CarePlan[]
  pageInfo: PagedListInfo
  errors: any,
  ui: {
    called: boolean,
    loading: boolean
  }
}

export type CarePlansState = {
  currentType: GqlCarePlanType
  list: {
    workspace: CarePlansContainer
    template: CarePlansContainer
  }
  builder: {
    currentCarePlan: CarePlan
    carePlanVariables?: Variable[]
    isNew: boolean
    currentPart: BuilderParts
    data: CarePlan | undefined
    uiJson: string
    request: {
      isLoading: boolean
      loadedEmpty: boolean
      loadedData: boolean
      error: any
    }
  }
}

export type PagedListInfo = {
  page: number
  perPage: number
  totalItems?: number
  totalPages?: number
}
