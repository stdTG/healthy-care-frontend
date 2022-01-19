import React, { useEffect, useState } from 'react';
import { not } from 'ramda';
import { Calendar as BigCalendar } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import EventDay from './components/EventDay';
import EventMonth from './components/EventMonth';
import DateCellHeader from './components/DateCellHeaderView';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions as calendarActions,
  selectors,
} from '../../services/calendar/index';
import { parseISO } from 'date-fns';

// const DnDCalendar = withDragAndDrop(BigCalendar);
const DnDCalendar = BigCalendar;

function Calendar(props) {
  const {
    workHours,
    selectedEvent,
    connectedComponents = {},
    onRangeChange,
    openEventDialog,
    openDetailsDialog,
    highlightEvent,
    updateEvent,
    loading,
    ...calendarData
  } = props;

  const dispatch = useDispatch();
  const currentView = useSelector(selectors.getCurrentView);

  const [minMax, setMinMax] = useState(
    currentView === 'day'
      ? props.getVisibleTimePeriod(workHours, new Date())
      : props.getVisibleTimePeriod(workHours)
  );

  const [selectedDay, setSelectedDay] = useState(new Date());

  useEffect(() => {
    if (currentView === 'day') {
      setMinMax(props.getVisibleTimePeriod(workHours, selectedDay));
      return;
    }

    setMinMax(props.getVisibleTimePeriod(workHours));
  }, [workHours]);

  const onUpdateEvent = (data) => {
    updateEvent({
      ...data.event,
      start: data.start,
      end: data.end,
    });
  };

  const onNavigate = (date, view) => {
    dispatch(calendarActions.setCurrentView({ view }));

    if (view === 'day') {
      setMinMax(props.getVisibleTimePeriod(workHours, date));
      setSelectedDay(date);
    }
    highlightEvent({ eventId: null, date });
  };

  const onSelectEvent = (props) => {
    highlightEvent({ eventId: props.id_, date: props.start });
  };
  const onDoubleClickEvent = (props) => {
    if (parseISO(props.startDate) > new Date()) {
      openDetailsDialog(props);
    }
  };
  const onSelecting = (props) => {};
  const onSelectSlot = (data) => {
    // openEventDialog(data);
  };

  let calendarComponents = {
    event: EventDay,
    toolbar: connectedComponents.ToolbarView,
    dateCellWrapper: connectedComponents.DateCellWrapper,
    timeSlotWrapper: connectedComponents.TimeSlotWrapper,
    month: {
      event: EventMonth,
      dateHeader: DateCellHeader,
    },
  };

  const getDate = (date) => {
    let newDate = date;

    if (not(date instanceof Date)) {
      newDate = new Date(date + '.000Z');
    }
    return newDate;
  };
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <DnDCalendar
        resizable
        selectable
        step={30}
        components={calendarComponents}
        style={{ height: '85vh' }}
        defaultDate={new Date()}
        selected={
          selectedEvent && selectedEvent.eventId
            ? props.events[selectedEvent.eventId]
            : undefined
        }
        date={
          selectedEvent && selectedEvent.date
            ? getDate(selectedEvent.date)
            : undefined
        }
        startAccessor={(event) => getDate(event.startDate)}
        endAccessor={(event) => getDate(event.endDate)}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onEventResize={onUpdateEvent}
        onEventDrop={onUpdateEvent}
        onSelectSlot={onSelectSlot}
        onSelecting={onSelecting}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
        onView={(data) => {
          if (data === 'day') {
            setMinMax(props.getVisibleTimePeriod(workHours, selectedDay));
          } else {
            setMinMax(props.getVisibleTimePeriod(workHours));
          }
        }}
        min={minMax.min}
        max={minMax.max}
        {...calendarData}
      />

      {loading && (
        <SpinnerWrap>
          <CircularProgress size={35} />
        </SpinnerWrap>
      )}
    </div>
  );
}

export default Calendar;

const SpinnerWrap = styled.div`
  position: absolute;
  height: inherit;
  background-color: white;
  opacity: 0.7;
  width: 100%;
  top: 64px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  border-radius: 18px;

  &:hover {
    pointer-events: none;
  }
`;
