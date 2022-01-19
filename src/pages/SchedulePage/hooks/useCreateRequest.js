import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import { CREATE_APPOINTMENT } from 'pages/SchedulePage/gqlSchemes/createAppointment';
import { CREATE_EVENT } from 'pages/SchedulePage/gqlSchemes/createEvent';
import { actions as calendarActions } from 'services/calendar';
import { format } from 'date-fns';

function useCreateRequest(props) {
  const dispatch = useDispatch();

  const [
    createAppointment,
    {
      called,
      loading: loadingCreateAppointment,
      error: appointmentError,
      data: appointment,
    },
  ] = useMutation(CREATE_APPOINTMENT);

  const [
    createEvent,
    {
      called: calledEvent,
      loading: loadingCreateEvent,
      error: eventError,
      data: event,
    },
  ] = useMutation(CREATE_EVENT);

  const onCreateAppointment = async (payload) => {
    const startDate = format(payload?.startDate, "yyyy-MM-dd'T'hh:mm:ss");
    const endDate = format(payload?.endDate, "yyyy-MM-dd'T'hh:mm:ss");

    const response = await createAppointment({
      variables: {
        record: {
          user: payload?.user,
          endDate: payload?.endDate?.toISOString(),
          startDate: payload.startDate?.toISOString(),
          eventType: payload.eventType,
          isOnline: payload.location === 'ONLINE',
          note: payload?.note,
          patient: payload.patient,
        },
      },
    });

    if (response && response.data.schedule.createAppointment.ok) {
      dispatch(
        calendarActions.addEvent({
          event: {
            ...response.data.schedule.createAppointment.result,
            startDate: response.data.schedule.createAppointment.result?.startDate?.split(
              '+'
            )[0],
            endDate: response.data.schedule.createAppointment.result?.endDate?.split(
              '+'
            )[0],
            isAppointment: true,
          },
        })
      );
    }
  };

  const onCreateEvent = async (payload) => {
    const response = await createEvent({
      variables: {
        record: {
          endDate: payload.endDate.toISOString(),
          startDate: payload.startDate.toISOString(),
          // eventType: payload.eventType,
          // location: payload.location,
          title: payload.title,
          users: payload.users,
          isOnline: false,
        },
      },
    });

    if (response && response.data.schedule.createEvent.ok) {
      dispatch(
        calendarActions.addEvent({
          event: {
            ...response.data.schedule.createEvent.result,
            startDate: response.data.schedule.createEvent.result?.startDate?.split(
              '+'
            )[0],
            endDate: response.data.schedule.createEvent.result?.endDate?.split(
              '+'
            )[0],
          },
        })
      );
    }
  };

  if (appointmentError) {
    console.error('Create appointment failed', appointmentError);
  }

  return {
    onCreateAppointment,
    onCreateEvent,
    loadingCreateAppointment,
    loadingCreateEvent,
  };
}

export default useCreateRequest;
