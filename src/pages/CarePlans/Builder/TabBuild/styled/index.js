import styled from 'styled-components';
import colors from 'lib/colors';

export const SEmptyList = styled('div')`
  position: absolute;
  left: 46%;
  top: 50%;
  right: 0;
  bottom: 0;
  color: ${colors.gray100};

  &:hover {
    cursor: pointer;
  }
`;
