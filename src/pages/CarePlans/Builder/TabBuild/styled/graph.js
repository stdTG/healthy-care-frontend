import styled from 'styled-components';
import colors from 'lib/colors';

export const SContainer = styled('div')`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  //overflow: hidden;
  border: 1px solid ${colors.gray700};
  border-radius: 18px;
`;
