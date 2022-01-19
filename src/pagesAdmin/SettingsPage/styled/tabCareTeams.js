import React from 'react';
import styled from 'styled-components';

import { Icon } from 'components/ui';
import colors from 'lib/colors';

export const SIcon = styled((props) => {
  return (
    <span className={props.className}>
      <Icon
        icon={props.icon}
        color={props.color}
        style={{ color: props.color ? '' : colors.gray100 }}
      />
    </span>
  );
})`
  width: 20px;
  text-align: center;
  margin-right: 8px;
  display: inline-block;
  vertical-align: bottom;
`;

export const SEmptyHint = styled.span`
  color: ${(props) => props.theme.palette.text.secondary};
  font-weight: 500;
`;

export const SCardRow = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: ${(props) => props.mb || 10}px;
  margin-top: ${(props) => props.mt}px;
`;

export const SEmptyLine = styled.span`
  border-top: 1px solid;
  display: inline-block;
  height: 1px;
  vertical-align: middle;
  width: 50px;
  color: #aaa;
`;
