import styled from 'styled-components';

import colors from 'lib/colors';

const SCell = styled.span`
  width: 100%;
  display: block;
  background-color: ${(props) =>
    props.isInactive ? colors.gray150 : colors.white};
  border-right: 1px solid #ddd;

  &:first-child {
    border-left: 1px solid #ddd;
  }
`;

const SHeader = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) =>
    props.isCurrentDate
      ? props.theme.palette.warning.main
      : props.isOffRange
      ? colors.gray200
      : props.theme.palette.text.primary};
`;

export { SCell, SHeader };
