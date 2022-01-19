import React from 'react';
import { map, not } from 'ramda';
import { add, format, parseISO } from 'date-fns';
import {
  Box as MuiBox,
  ButtonGroup as MuiButtonGroup,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import { SIconButton, SButton } from 'components/Calendar/styled/toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { actions as CalendarActions } from '../../../services/calendar/index';
import styled from 'styled-components';
import { selectors as userSelectors } from '../../../services/user/index';
import { convertToTitleCase } from 'lib/utils';
import { TeamMemberSelect } from './TeamMemberSelect';

const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
};

function Toolbar(props) {
  const {
    view,
    views,
    date,
    onNavigate,
    onView,
    orgUnitMembers,
    calendarFilter,
    setCalendarFilter,
  } = props;

  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  const handleNavigate = function (date, action) {
    let navigateDate = date;
    switch (action) {
      case navigate.PREVIOUS:
        navigateDate = add(date, -1, 'month');

      case navigate.NEXT:
        navigateDate = add(date, 1, 'month');
    }

    onNavigate(navigateDate);
  };

  let month = date;

  if (not(date instanceof Date)) {
    month = parseISO(date);
  }

  const orgUnitMembersWithAgendaButton = [
    { id_: '', firstName: 'Team', lastName: 'agenda' },
    ...orgUnitMembers,
  ];

  const defaultValue = orgUnitMembers?.find((item) => item?.id_ === user?.id_);

  return (
    <div>
      <MuiBox
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
      >
        <MuiBox display="flex" justifyContent="space-between" my={2}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <MuiButtonGroup
              size="small"
              variant="outlined"
              style={{ marginRight: '16px' }}
            >
              {map((item) => {
                //TODO delete condition when agenda work
                if (item === 'agenda') {
                  return;
                }

                return (
                  <SButton
                    key={item}
                    onClick={() => {
                      dispatch(CalendarActions.setCurrentView({ view: item }));
                      onView(item);
                    }}
                    color={view === item ? 'primary' : 'default'}
                  >
                    {convertToTitleCase(item)}
                  </SButton>
                );
              }, views)}
            </MuiButtonGroup>

            <TeamMemberSelect
              options={orgUnitMembersWithAgendaButton}
              defaultValue={defaultValue}
              value={calendarFilter}
              onChange={setCalendarFilter}
            />
          </div>

          <MuiBox>{props.children}</MuiBox>
        </MuiBox>

        <CalendarTitleWrap>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '46%',
              alignItems: 'center',
            }}
          >
            <MuiButtonGroup size="small" variant="outlined">
              <SIconButton onClick={() => handleNavigate(navigate.PREVIOUS)}>
                <ArrowBackIosIcon style={{ fontSize: 12 }} />
              </SIconButton>
              <SIconButton onClick={() => handleNavigate(navigate.TODAY)}>
                <RadioButtonUncheckedIcon style={{ fontSize: 14 }} />
              </SIconButton>
              <SIconButton onClick={() => handleNavigate(navigate.NEXT)}>
                <ArrowForwardIosIcon style={{ fontSize: 12 }} />
              </SIconButton>
            </MuiButtonGroup>
          </div>
          <CalendarTitle>{format(month, 'MMMM yyyy')}</CalendarTitle>
        </CalendarTitleWrap>
      </MuiBox>
    </div>
  );
}

export default Toolbar;

const CalendarTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const CalendarTitleWrap = styled.div`
  display: flex;
  background-color: white;
  border-radius: 18px 18px 0px 0;
  padding: 25px 25px 0 25px;
`;
