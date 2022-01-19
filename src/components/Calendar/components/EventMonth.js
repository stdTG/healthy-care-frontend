import React from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import { getDateFormat } from 'lib/utils';
import { getModuleState } from 'services/calendar';
import { meetingTypesData } from 'lib/enums/meetingTypes';
import {
  SContainer,
  STime,
  STitle,
} from 'components/Calendar/styled/eventMonth';
import UserTag from '../../../pages/SchedulePage/styled/userTag.ts';
import { parseISO } from 'date-fns';
import VideocamIcon from '@material-ui/icons/Videocam';
import { meetingTypes } from 'lib/enums/meetingTypes';
import { useTranslation } from 'react-i18next';

const currentDate = new Date();

function EventMonth(props) {
  const { title, event } = props;
  const calendarState = useSelector(getModuleState);
  const { selectedEvent } = calendarState;

  const isSelected = selectedEvent.eventId === event.id_;
  const { t } = useTranslation();

  const titleText =
    title ||
    (event.eventType && meetingTypesData[event.eventType].label) ||
    t('New event');

  const disabled = parseISO(event?.startDate + '.000Z') < currentDate;

  return (
    <SContainer
      isSelected={isSelected}
      disabled={disabled}
      view="month"
      event={event}
    >
      <STime view="month" isSelected={isSelected} disabled={disabled}>
        <span style={{ marginRight: '3px' }}>
          {format(getDateFormat(event.startDate), 'hh:mm aaaaa ')}
        </span>
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
      </STime>
      <STitle view="month" isSelected={isSelected} disabled={disabled}>
        {titleText}
      </STitle>
    </SContainer>
  );
}

export default EventMonth;
