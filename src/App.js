import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { ThemeProvider, FetchProvider } from 'lib/providers';
import Routing from 'routing';
import store, { persistor } from './store/index';

import 'lib/icons/all.js';
import { SnackbarProvider } from 'notistack';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './i18n';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FetchProvider>
          <ThemeProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <SnackbarProvider>
                <DndProvider backend={HTML5Backend}>
                  <Routing />
                </DndProvider>
              </SnackbarProvider>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </FetchProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
