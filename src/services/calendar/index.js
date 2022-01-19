import { createSlice } from '@reduxjs/toolkit';
import { filter, indexBy, prop, values } from 'ramda';
import { parseISO } from 'date-fns';

import eventUserStatuses from 'lib/enums/eventUserStatuses';

export const getModuleState = (state) => state.calendar;

export const selectors = {
  getUpcoming(state) {
    const events = values(getModuleState(state).events);

    return events.filter((event) => {
      const patientStatusesIsApproved =
        event?.patients?.length !== 0 &&
        event?.patients?.every(
          (patient) => patient?.status === eventUserStatuses.approved
        );

      const userStatusesIsApproved =
        event?.users?.length !== 0 &&
        event?.users?.every(
          (user) => user?.status === eventUserStatuses.approved
        );

      return (
        parseISO(event.startDate + '.000Z') > new Date() &&
        (patientStatusesIsApproved || userStatusesIsApproved)
      );
    });
  },
  getPending(state) {
    const eventsArr = values(getModuleState(state).events);
    return filter((event) => {
      return (
        parseISO(event.startDate + '.000Z') > new Date() &&
        (event?.patient?.status === eventUserStatuses.awaiting ||
          event?.patients?.[0]?.status === eventUserStatuses.awaiting ||
          event?.user?.status === eventUserStatuses.awaiting ||
          event?.users?.[0]?.status === eventUserStatuses.awaiting)
      );
    }, eventsArr);
  },
  getRequested(state) {
    const eventsArr = values(getModuleState(state).events);

    return filter((event) => {
      // if (!event.isAppointment) {
      //   return;
      // }
      return (
        parseISO(event.startDate + +'.000Z') > new Date() &&
        event?.patients?.[0]?.status === eventUserStatuses.awaiting
      );
    }, eventsArr);
  },
  getCanceled(state) {
    const eventsArr = values(getModuleState(state).events);

    return filter((event) => {
      if (!event.isAppointment) {
        return;
      }

      return (
        event?.patient?.status === eventUserStatuses?.cancelled ||
        event?.patients?.[0]?.status === eventUserStatuses?.cancelled ||
        event?.user?.status === eventUserStatuses?.cancelled ||
        event?.users?.[0]?.status === eventUserStatuses?.cancelled
      );
    }, eventsArr);
  },
  getWorkingHours(state) {
    return getModuleState(state).workingHours;
  },
  getCurrentView(state) {
    return getModuleState(state).currentView;
  },
};

const slice = createSlice({
  name: 'calendar',
  initialState: {
    events: {},
    workingHours: [],
    eventDuration: 30,
    currentView: '',
    selectedEvent: {
      date: null,
      eventId: null,
    },
  },
  reducers: {
    addEvent(state, { payload }) {
      const { event } = payload;
      state.events[event.id_] = event;
    },
    highlightEvent(state, { payload }) {
      state.selectedEvent = {
        eventId: payload.eventId,
        date: payload.eventId
          ? state.events[payload.eventId].startDate
          : payload.date,
      };
    },
    updateEvent(state, { payload }) {
      const { data } = payload;
      state.events[data.id_] = {
        ...state.events[data.id_],
        ...data,
      };
    },
    setWorkingHours(state, { payload }) {
      state.workingHours = payload;
    },
    setEvents(state, { payload }) {
      const { events } = payload;

      state.events = indexBy(prop('id_'), events);
    },
    setCurrentView(state, { payload }) {
      const { view } = payload;
      state.currentView = view;
    },
    cancelEvent(state, { payload }) {
      const { id, isEvent } = payload;

      if (isEvent && state.events[id]) {
        state.events[id] = {
          ...state.events[id],
          patients: [
            {
              ...state.events[id].patients[0],
              status: eventUserStatuses.cancelled,
            },
          ],
          users: [
            {
              ...state.events[id].users[0],
              status: eventUserStatuses.cancelled,
            },
          ],
        };
      }

      state.events[id] = {
        ...state.events[id],
        patient: {
          ...state.events[id].patient,
          status: eventUserStatuses.cancelled,
        },
        user: {
          ...state.events[id].user,
          status: eventUserStatuses.cancelled,
        },
      };
    },
  },
});

export const actions = slice.actions;
export const reducer = slice.reducer;
