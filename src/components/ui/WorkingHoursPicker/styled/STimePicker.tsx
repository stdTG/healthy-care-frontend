import styled from 'styled-components';
import TimePicker from '../../TimePicker';
import Icon from '../../Icon';
import React from 'react';

const STimePicker = styled((props) => (
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
  border: ${(props) => (props.isError ? '1px solid red' : null)};
  margin-bottom: 6px;
  border-radius: 10px;
  margin-right: ${(props) => props.marginRight};
  .ant-picker-input {
    ${(props) => props.suffixIcon && 'padding-left: 25px;'}
  }
  .ant-picker-suffix {
    position: absolute;
    left: 0;
    color: black;
  }
  .ant-picker:hover {
    border: ${(props) =>
  props.isError ? '1px solid red' : '1px solid #40a9ff'};
  }
`

export default STimePicker
