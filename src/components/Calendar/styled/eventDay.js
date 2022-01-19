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

const STime = styled('div')`
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => getTextColor(props)};
  margin-right: 3px;
  text-align: center;
`;

const STitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => getTextColor(props)};
  display: flex;
  align-items: center;
  margin-left: 3px;
  overflow: hidden;
`;

const SInfo = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => (!props.isSelected ? 'white' : 'black')};
  display: flex;
  align-items: center;

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

  if (event?.isAppointment) {
    return '#2164E8';
  } else {
    return '#777777';
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
  padding: 2px 5px 0px 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  font-size: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export { SContainer, STime, STitle, SInfo };
