import React from 'react';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';

import { getDateFormat } from 'lib/utils';
import { getModuleState } from 'services/calendar';
import {
  SContainer,
  STime,
  STitle,
  SInfo,
} from 'components/Calendar/styled/eventDay';
import UserTag from '../../../pages/SchedulePage/styled/userTag.ts';
import VideocamIcon from '@material-ui/icons/Videocam';
import { meetingTypes } from 'lib/enums/meetingTypes';

const currentDate = new Date();
function EventDay(props) {
  const { title, event } = props;
  const calendarState = useSelector(getModuleState);
  const { selectedEvent } = calendarState;

  const isSelected = selectedEvent?.eventId === event?.id_;
  const disabled = parseISO(event?.startDate + '.000Z') < currentDate;

  const getFormattedTitle = (title) => {
    if (title.length > 10) {
      return title.slice(0, 13) + '...';
    }
    return title;
  };

  return (
    <SContainer isSelected={isSelected} event={event} disabled={disabled}>
      <STime isSelected={isSelected} disabled={disabled}>
        {format(getDateFormat(event?.startDate), 'hh:mm')} -{' '}
        {format(getDateFormat(event?.endDate), 'hh:mm a')}
      </STime>
      <SInfo>
        {event?.eventType === meetingTypes.consultation && event?.isOnline && (
          <VideocamIcon />
        )}
        <UserTag
          isAppointment={event?.isAppointment}
          isSelected={isSelected}
          disabled={disabled}
        >
          <span>
            {event?.createdBy?.firstName?.split('')[0]?.toUpperCase()}
          </span>
          <span>{event?.createdBy?.lastName?.split('')[0]?.toUpperCase()}</span>
        </UserTag>
        <STitle isSelected={isSelected} disabled={disabled}>
          {calendarState.currentView === 'day'
            ? title || event?.patient?.firstName
            : getFormattedTitle(title || event?.patient?.firstName)}
        </STitle>
      </SInfo>
    </SContainer>
  );
}

export default EventDay;
