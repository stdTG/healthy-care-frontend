import { Action, combineReducers } from 'redux';

import { actions as authActions, reducer as authReducer } from 'services/auth';
import { reducer as patientRecordReducer } from '../services/patientRecord/index';
import { reducer as calendarReducer } from 'services/calendar';
import { reducer as carePlansReducer } from 'pages/CarePlans/carePlanService';
import { reducer as userReducer } from '../services/user/index';
import { reducer as widgetReducer } from '../services/widget/index';

const combinedRootReducer = combineReducers({
  auth: authReducer,
  calendar: calendarReducer,
  patientRecord: patientRecordReducer,
  carePlans: carePlansReducer,
  user: userReducer,
  widget: widgetReducer,
});

function rootReducer(state: RootState, action: Action) {
  if (action.type === authActions.logout.toString()) {
    state = undefined as unknown as RootState
    localStorage.removeItem('persist:auth');
    sessionStorage.clear();
  }

  return combinedRootReducer(state, action);
}

export default rootReducer;

export type RootState = ReturnType<typeof combinedRootReducer>
