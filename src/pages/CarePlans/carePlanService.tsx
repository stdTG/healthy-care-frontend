import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuilderParts, CarePlanStatus, CarePlanType } from './constants';
import { CarePlan, CarePlansContainer, CarePlansState, Variable } from './models';
import { GetList_ResponseData } from './_service/gqlSchemes/getList';
import { GetOne_ResponseData } from './_service/gqlSchemes/getOne';
import { Create_ResponseData } from './_service/gqlSchemes/create';
import { GqlCarePlanType } from '../../generated/graphql';
import { RootState } from '../../store/reducer';

export function getContainer(state: CarePlansState, type: GqlCarePlanType) {
  if (type === GqlCarePlanType.Template) {
    return state.list.template;
  }
  return state.list.workspace;
}

const getSliceState = (state: RootState) => state.carePlans

export const selectors = {
  getCurrentCarePlan: (state: RootState) => getSliceState(state).builder.currentCarePlan,
  getCarePlansWorkspace: (state: RootState) => getSliceState(state).list.workspace.items,
  getCarePlanVariables: (state: RootState) => getSliceState(state).builder.carePlanVariables,
}

const containerInitialState = {
  items: [] as CarePlan[],
  pageInfo: {
    page: 0,
    pageSize: 20
  },
  ui: {
    called: false,
    loading: false
  }
};

const emptyCarePlan = {
  id_: '',
  name: '',
  subtitle: '',
  description: '',
  image: '',
  durationMonths: 0,
  durationWeeks: 0,
  durationDays: 0,
  authorId: '',
  tags: [],
  status: CarePlanStatus.Draft,
  awsStateMachineArn: '',
  uiJson: ''
} as CarePlan;

const initialState = {
  currentType: GqlCarePlanType.Workspace,
  list: {
    workspace: containerInitialState as unknown as CarePlansContainer,
    template: containerInitialState as unknown as CarePlansContainer
  },
  builder: {
    currentCarePlan: emptyCarePlan,
    carePlanVariables: [],
    isNew: false,
    currentPart: BuilderParts.Settings,
    data: emptyCarePlan as CarePlan,
    uiJson: '',
    request: {
      isLoading: true,
      loadedEmpty: false,
      loadedData: false,
      error: {}
    }
  }
} as CarePlansState;

const slice = createSlice({
  name: 'CarePlansState',
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<GqlCarePlanType>) {
      if (state.currentType === action.payload) return;
      state.currentType = action.payload;
    },
    setItems(state, action: PayloadAction<{ data: GetList_ResponseData, type: GqlCarePlanType }>) {
      const container = getContainer(state, action.payload.type);
      const data = action.payload.data;
      container.items = data.carePlan.list.items || [];
      container.pageInfo = data.carePlan.list.pageInfo;
    },
    setBuilderEmpty(state) {
      state.builder.data = emptyCarePlan as CarePlan;
    },
    setBuilderIsNew(state, action: PayloadAction<boolean>) {
      if (state.builder.isNew == action.payload) return;
      state.builder.isNew = action.payload;
      // state.builder.data = emptyCarePlan as CarePlan;
    },
    changeBuilderPart(state, action: PayloadAction<BuilderParts>) {
      if (state.builder.currentPart == action.payload) return;
      state.builder.currentPart = action.payload;
    },
    setBuilder_Data(state, action: PayloadAction<CarePlan>) {
      state.builder.data = action.payload;
    },
    setBuilder_GetOneData(state, action: PayloadAction<{
      data: GetOne_ResponseData | undefined
      called: boolean
      loading: boolean
      error: any
    }>) {
      state.builder.request.isLoading = !action.payload.data && action.payload.loading;
      state.builder.request.loadedEmpty = !action.payload.data && !action.payload.loading;
      state.builder.request.loadedData = (!!action.payload.data) && !action.payload.loading;
      state.builder.request.error = action.payload.error;
      if (action.payload.data) {
        state.builder.data = action.payload.data.carePlan.one;
      }
    },
    setBuilder_CreateData(state, action: PayloadAction<Create_ResponseData>) {
      if (!state.builder.data) {
        state.builder.data = emptyCarePlan as CarePlan;
      }
      state.builder.data.id_ = action.payload?.carePlan?.create?.resultId;
    },
    setBuilder_UpdateData(state) {
    },
    setBuilder_DeleteData(state, action: PayloadAction<Create_ResponseData>) {
      //state.builder.data = action.payload.carePlan.one
    },
    setJson(state, { payload }) {
      state.builder.uiJson = payload.uiJson
    },
    //TODO refactor types
    updateCarePlan(state, { payload }: {payload: CarePlan}) {
      const updatedList = state.list.workspace.items.filter((item) => payload && item.id_ !== payload.id_)
      state.list.workspace.items = [...updatedList, payload]
    },
    setCurrentCarePlan(state, { payload }: {payload: CarePlan}) {
      state.builder.currentCarePlan = payload
    },
    updateCurrentCarePlan(state, { payload }: {payload: CarePlan}) {
      state.builder.currentCarePlan = {
        ...state.builder.currentCarePlan,
        ...payload
      }
    },
    removeCurrentCarePlan(state) {
      state.builder.currentCarePlan = {}
    },
    setCarePlanVariables(state, { payload }: { payload: { variables: Variable[] }}) {
      state.builder.carePlanVariables = payload.variables
    }
  }
});

export const actions = slice.actions;
export const reducer = slice.reducer;
