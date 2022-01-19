import styled from 'styled-components';

import colors from 'lib/colors';

export const STimeSlot = styled.div`
  font-size: 12px;
  width: 100%;
  text-align: center;
  background-color: ${(props) =>
    props.isInactive ? colors.gray150 : colors.white};
  //height: 20px;
`;
