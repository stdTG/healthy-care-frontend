import styled from 'styled-components';
import { Icon } from 'components/ui';
import { Checkbox as MuiCheckbox } from '@material-ui/core';
import TimePicker from 'components/ui/TimePicker';
import React from 'react';

export const WeekDays = styled.div`
  display: flex;
  & > div:last-child {
    border-right: 1px solid;
  }
`;

export const WeekDay = styled.div`
  border: 1px solid;
  padding: 3px;
  text-align: center;
  border-right: 0;
  border-bottom: 0;

  &:last-child {
    border-bottom: 1px solid;
  }
`;

export const Checkbox = styled((props) => (
  <MuiCheckbox
    {...props}
    label={
      <Icon
        icon="times"
        color="primary"
        style={{ position: 'absolute', top: '10px', left: '14px' }}
      />
    }
    formControlProps={{ className: props.className }}
  />
))`
  margin: 0;
  .MuiFormControlLabel-root {
    margin: 0;
    svg {
      visibility: hidden;
    }
  }
`;

export const STimePicker = styled((props) => (
  <TimePicker
    allowClear={true}
    use12Hours={true}
    suffixIcon={() => <Icon icon="date" />}
    showNow={false}
    minuteStep={30}
    format="hh:mm a"
    popupStyle={{
      zIndex: 9999,
    }}
    {...props}
  />
))`
  margin-bottom: 6px;
  border-radius: 10px;
  margin-right: ${(props) => props.marginRight};
`;
