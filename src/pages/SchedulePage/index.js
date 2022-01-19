import React, { useContext, useState } from 'react';
import { values } from 'ramda';
import { Box as MuiBox } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Calendar from 'components/Calendar';
import useDialog from 'lib/hooks/useDialog';
import { LocalizeContext } from 'lib/providers/localizer';
import { actions as calendarActions, getModuleState } from 'services/calendar';
import getVisibleTimePeriod from './utils/getVisibleTimePeriod';
import useEventsRequest from './hooks/useEventsRequest';
import useCreateRequest from './hooks/useCreateRequest';

import AppointmentDialog from './AppointmentDialog/index';
import CalendarToolbar from './CalendarToolbar';
import WorkHoursDialog from '../../components/ui/WorkHoursDialog/index';
import ConnectedCell from './ConnectedCell';
import ConnectedSlot from './ConnectedSlot';
import DeleteDialog from './DeleteDialog';
import EventDialog from './EventDialog';
import EventCards from './EventCards';

import useWorkingHours from './hooks/useWorkingHours';
import LoadingPage from '../../components/LoadingPage/index';
import AppointmentDetailsDialog from './AppointmentDialog/AppointmentDetailsDialog/index';
import useOpenWorkHoursDialogFunction from './hooks/useOpenWorkHoursDialogFunction';
import EventDetailsDialog from './EventDialog/EventDetailsDialog/index';
import useLoadEvents from './hooks/useLoadEvents';
import { format, add } from 'date-fns';
import { selectors } from '../../services/user/index';
import { useOrgUnitMembers } from './hooks/useOrgUnitMembers';

function SchedulePage() {
  const user = useSelector(selectors.getUser);
  const userId = user?.id_;
  const orgUnit = user?.orgUnit;

  const careTeamId = orgUnit?.__typename === 'CareTeam' ? orgUnit?.id_ : '';
  const subOrgId =
    orgUnit?.__typename === 'SubOrganization' ? orgUnit?.id_ : '';

  const { orgUnitMembers } = useOrgUnitMembers({ careTeamId, subOrgId });

  const [calendarFilter, setCalendarFilter] = useState(userId);

  const { loadingGetEvents, setDateInterval, callCount } = useLoadEvents(
    calendarFilter
  );

  const {
    onCreateAppointment: createAppointment,
    onCreateEvent: createEvent,
    loadingCreateAppointment,
    loadingCreateEvent,
  } = useCreateRequest();

  const dispatch = useDispatch();

  const localizer = useContext(LocalizeContext);

  const { events, selectedEvent, workingHours } = useSelector(getModuleState);

  const deleteDialog = useDialog();
  const eventDialog = useDialog();
  const workHoursDialog = useDialog();
  const appointmentDialog = useDialog();
  const detailsDialog = useDialog();

  const onUpdateEvent = (event) => {
    dispatch(calendarActions.updateEvent(event));
  };

  const {
    saveWorkingHours,
    getWorkingHours,
    loadingGetWorkingHours,
    loadingSetWorkingHours,
  } = useWorkingHours(workHoursDialog.isOpen);

  const { openWorkHoursDialog } = useOpenWorkHoursDialogFunction(
    getWorkingHours,
    workHoursDialog,
    saveWorkingHours
  );

  async function openAppointmentDialog(initialData) {
    const result = await appointmentDialog.open({ userId });

    if (!result || !result.data) return;

    createAppointment(result.data);
  }

  const openEventDialog = async () => {
    const initialData = {
      startDate: null,
      users: [],
      title: '',
      isAppointment: false,
    };

    const result = await eventDialog.open({
      ...initialData,
      careTeamId,
      subOrgId,
    });

    if (!result || !result.data) return;

    createEvent(result.data);
  };

  const openDetailsDialog = (event) => {
    detailsDialog.open(event);
  };

  const filteredEvents = values(events)?.filter((event) => {
    if (event.isAppointment) {
      return event.user?.status !== 'CANCELLED';
    } else {
      return event.users[0]?.status !== 'CANCELLED';
    }
  });

  const ToolbarView = (props) => {
    const initialData = {
      startDate: null,
      patient: null,
      eventType: '',
      location: '',
      careTeamMember: null,
      note: '',
      isAppointment: true,
    };
    return (
      <CalendarToolbar
        {...props}
        newAppointment={() => openAppointmentDialog(initialData)}
        openTermDialog={openWorkHoursDialog}
        openAddEventDialog={openEventDialog}
        subOrgId={subOrgId}
        careTeamId={careTeamId}
        calendarFilter={calendarFilter}
        setCalendarFilter={setCalendarFilter}
        orgUnitMembers={orgUnitMembers || []}
      />
    );
  };

  const onIntervalChange = (dateInterval) => {
    if (dateInterval instanceof Array) {
      const startDate = dateInterval[0];
      const endDate = dateInterval[dateInterval.length - 1];

      if (startDate && endDate) {
        setDateInterval({
          startDate: format(startDate, 'yyyy-MM-dd'),
          // for unknown reasons last date in interval one day less than actually shown date
          endDate: format(add(endDate, { days: 1 }), 'yyyy-MM-dd'),
        });
      }
      return;
    }

    setDateInterval({
      startDate: format(dateInterval?.start, 'yyyy-MM-dd'),
      endDate: format(dateInterval?.end, 'yyyy-MM-dd'),
    });
  };

  const loadings = loadingGetEvents && callCount < 1;

  return (
    <>
      {loadings ? (
        <LoadingPage />
      ) : (
        <div style={{ display: 'flex', padding: '24px' }}>
          <EventCards />
          <MuiBox style={{ flexGrow: 1 }}>
            <Calendar
              loading={
                loadingGetWorkingHours ||
                loadingGetEvents ||
                loadingCreateAppointment ||
                loadingCreateEvent
              }
              defaultView="month"
              events={filteredEvents}
              localizer={localizer}
              connectedComponents={{
                DateCellWrapper: ConnectedCell,
                TimeSlotWrapper: ConnectedSlot,
                ToolbarView,
              }}
              workHours={workingHours}
              onRangeChange={(dateInterval) => onIntervalChange(dateInterval)}
              selectedEvent={selectedEvent}
              openEventDialog={openAppointmentDialog}
              openDetailsDialog={openDetailsDialog}
              updateEvent={onUpdateEvent}
              highlightEvent={(payload) => {
                dispatch(calendarActions.highlightEvent(payload));
              }}
              getVisibleTimePeriod={getVisibleTimePeriod}
            />
          </MuiBox>

          <AppointmentDialog
            isOpen={appointmentDialog.isOpen}
            close={appointmentDialog.close}
            initialData={appointmentDialog.initialData}
          />

          <EventDialog
            isOpen={eventDialog.isOpen}
            close={eventDialog.close}
            initialData={eventDialog.initialData}
            // deleteDialog={onDeleteEvent}
            orgUnitMembers={orgUnitMembers}
            careTeamId={careTeamId}
            subOrgId={subOrgId}
          />

          {workHoursDialog.isOpen && (
            <WorkHoursDialog
              isOpen={workHoursDialog.isOpen}
              close={workHoursDialog.close}
              initialData={workHoursDialog.initialData}
            />
          )}
          {detailsDialog.isOpen && (
            <AppointmentDetailsDialog
              isOpen={
                detailsDialog.isOpen &&
                detailsDialog?.initialData?.isAppointment
              }
              close={detailsDialog.close}
              initialData={events[selectedEvent.eventId]}
              deleteDialog={deleteDialog.open}
              appointmentDetailsDialog={detailsDialog}
            />
          )}
          {detailsDialog.isOpen && (
            <EventDetailsDialog
              isOpen={
                detailsDialog.isOpen &&
                !detailsDialog?.initialData?.isAppointment
              }
              close={detailsDialog.close}
              initialData={events[selectedEvent.eventId]}
              deleteDialog={deleteDialog.open}
              eventDetailsDialog={detailsDialog}
              careTeamId={careTeamId}
              subOrgId={subOrgId}
            />
          )}
          <DeleteDialog
            isOpen={deleteDialog.isOpen}
            close={deleteDialog.close}
            initialData={deleteDialog.initialData}
          />
        </div>
      )}
    </>
  );
}

export default SchedulePage;
