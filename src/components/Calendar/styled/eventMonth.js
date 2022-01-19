import styled from 'styled-components';

import colors from 'lib/colors';

const getTextColor = ({ isAppointment, isSelected, disabled }) => {
  if (disabled) {
    return 'white';
  }

  if (isSelected) {
    return 'black';
  }

  return 'white';
};

const STitle = styled('span')`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => getTextColor(props)};
`;

const STime = styled('div')`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => getTextColor(props)};
  margin-right: 3px;
  svg {
    font-size: 20px;
  }
`;

const getBackGroundColorForContainer = (isSelected, disabled, event, view) => {
  if (disabled && event?.isAppointment) {
    return '#90B1F3';
  }

  if (disabled && !event?.isAppointment) {
    return '#B0B0B0';
  }

  if (isSelected) {
    return colors.green300;
  }

  if (view === 'month' && event?.isAppointment) {
    return '#2164E8';
  } else {
    return '#777777';
  }

  if (view === 'month') {
    return 'transparent';
  }

  return 'white';
};

const SContainer = styled('div')`
  background-color: ${(props) =>
    getBackGroundColorForContainer(
      props.isSelected,
      props.disabled,
      props.event,
      props.view
    )};
  border-color: ${(props) =>
    props.isSelected ? colors.green100 : 'transparent'};
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  display: ${(props) => (props.view === 'month' ? 'flex' : 'block')};
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  height: 100%;
  overflow: hidden;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
  padding: ${(props) => (props.view === 'month' ? '0 5px' : '4px')};
`;

export { SContainer, STime, STitle };
