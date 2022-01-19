import React, { useState } from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import TodayIcon from '@material-ui/icons/Today';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import VideocamIcon from '@material-ui/icons/Videocam';
import {
  AccordionSummary as MuiAccordionSummary,
  Box as MuiBox,
  Tooltip,
} from '@material-ui/core';

import colors from 'lib/colors';
import { getDateFormat, cutDownText } from 'lib/utils';
import { Avatar, Chip, Icon, Space, Typography } from 'components/ui';
import {
  actions as calendarActions,
  getModuleState,
} from '../../services/calendar/index';
import { SAccordion, SEventPreview } from 'pages/SchedulePage/styled/eventCard';
import { useHistory } from 'react-router';
import useDialog from '../../lib/hooks/useDialog';
import ChooseDateDialog from '../SchedulePage/ChooseDateDialog/index';
import useRescheduleAppointment from './hooks/useRescheduleAppointment';
import CircularProgress from '@material-ui/core/CircularProgress';
import useRescheduleEvent from './hooks/useRescheduleEvent';
import { useTranslation } from 'react-i18next';
import { meetingTypes, meetingTypesData } from 'lib/enums/meetingTypes';
import Box from '@material-ui/core/Box';

function Card(props) {
  const { data, isCancelled } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const calendarState = useSelector(getModuleState);
  const { selectedEvent } = calendarState;
  const { t } = useTranslation();

  const chooseDateDialog = useDialog();

  const {
    onRescheduleAppointment,
    loadingRescheduleAppointment,
  } = useRescheduleAppointment();

  const { onRescheduleEvent, loadingRescheduleEvent } = useRescheduleEvent();

  const openChooseDateDialog = async (event) => {
    const { selectedTime } = await chooseDateDialog.open({
      selectedDate: {
        startDate: event.startDate,
        endDate: event.endDate,
      },
      isRescheduleMode: true,
    });

    if (!selectedTime) return;

    if (event?.isAppointment) {
      onRescheduleAppointment(event?.id_, selectedTime);
    } else {
      onRescheduleEvent(event?.id_, selectedTime);
    }
  };

  const highlightEvent = (eventId) => {
    dispatch(calendarActions.highlightEvent({ eventId }));
  };

  return (
    <SAccordion defaultExpanded={!data.isClosed}>
      <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={data.key}
        id={data.key}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {data.description}
          </Typography>
        </div>
      </MuiAccordionSummary>
      {data.events.length === 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Icon
            type="fad"
            icon="clipboard-list"
            size="3x"
            style={{ color: colors.gray700 }}
          />
        </div>
      )}
      {data.events.map((event) => {
        const loadings =
          (loadingRescheduleAppointment.loadingReschedule &&
            loadingRescheduleAppointment.id === event?.id_) ||
          (loadingRescheduleEvent.loadingReschedule &&
            loadingRescheduleEvent.id === event?.id_);

        const isAccepted = event?.user?.status === 'ACCEPTED';

        return (
          <SEventPreview
            isSelected={selectedEvent.eventId === event.id_}
            key={event.id_}
            onClick={() => {
              highlightEvent(event.id_);
            }}
          >
            <div>
              {loadings ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80px',
                  }}
                >
                  <CircularProgress size={25} />
                </div>
              ) : (
                <div>
                  <MuiBox display="flex" justifyContent="space-between">
                    <Tooltip title={event.note}>
                      <div>
                        <Typography
                          variant="h5"
                          gutterBottom
                          style={{
                            textDecoration: isCancelled ? 'line-through' : '',
                          }}
                        >
                          <span>
                            {format(
                              getDateFormat(event.startDate),
                              'EEE. dd MMM. yyyy '
                            )}
                            &sdot;
                            {format(
                              getDateFormat(event.startDate),
                              ' h:mma'
                            ).toLowerCase()}
                          </span>
                        </Typography>
                        <Typography variant="body1">
                          {`${event.patient?.firstName} ${event.patient?.lastName}`}
                        </Typography>
                        <Box display="flex">
                          <Typography variant="body1" color="textSecondary">
                            {meetingTypesData[meetingTypes.consultation].label}
                          </Typography>
                          {event.eventType === meetingTypes.consultation && (
                            <Box marginLeft={1}>
                              <Chip
                                onClick={() => {}}
                                color="background"
                                size="small"
                                icon={
                                  <VideocamIcon
                                    style={{ fontSize: 20, color: 'white' }}
                                  />
                                }
                              />
                            </Box>
                          )}
                        </Box>
                        <Typography variant="body1" color="textSecondary">
                          {event.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          gutterBottom
                        >
                          {event.isAppointment &&
                            event.note &&
                            cutDownText({ text: event.note, symbolsQtty: 80 })}
                        </Typography>
                      </div>
                    </Tooltip>
                    <Avatar />
                  </MuiBox>

                  <MuiBox display="flex" justifyContent="space-between" mt={1}>
                    <Space display="flex">
                      {isAccepted && !isCancelled && (
                        <Chip
                          onClick={() => {}}
                          color="secondary"
                          icon={<ChatBubbleOutlineOutlinedIcon />}
                          label={t('Contact')}
                        />
                      )}
                      {!isCancelled && (
                        <Chip
                          onClick={() => {}}
                          color="success"
                          icon={<EventAvailableIcon />}
                          label={isAccepted ? null : t('Accept')}
                        />
                      )}
                      {isCancelled && (
                        <Chip
                          onClick={() => {}}
                          color="warning"
                          icon={<Icon icon="times" />}
                          label={isAccepted ? null : t('Dismiss')}
                        />
                      )}
                      <Tooltip
                        title={t('Reschedule date')}
                        aria-label="reschedule"
                        placement="top"
                      >
                        <div>
                          <Chip
                            onClick={() => {
                              openChooseDateDialog(event);
                            }}
                            color="info"
                            icon={<DateRangeIcon />}
                          />
                        </div>
                      </Tooltip>
                    </Space>
                    <Space>
                      {event.isAppointment && (
                        <Tooltip
                          title={t('Patient record')}
                          aria-label="patient-record"
                          placement="top"
                        >
                          <Box display="flex">
                            <Box marginRight={1}>
                              <Chip
                                onClick={() => {}}
                                color="secondary"
                                icon={<Icon icon="calendar-day" />}
                              />
                            </Box>
                            <Chip
                              onClick={() => {
                                history.push(
                                  `/patientRecord/${event?.patient?.id_}`
                                );
                              }}
                              color="secondary"
                              icon={<PermIdentityIcon />}
                            />
                          </Box>
                        </Tooltip>
                      )}
                    </Space>
                  </MuiBox>
                </div>
              )}
            </div>
          </SEventPreview>
        );
      })}

      {chooseDateDialog.isOpen && (
        <ChooseDateDialog
          isOpen={chooseDateDialog.isOpen}
          close={chooseDateDialog.close}
          initialData={chooseDateDialog.initialData}
        />
      )}
    </SAccordion>
  );
}

export default Card;
