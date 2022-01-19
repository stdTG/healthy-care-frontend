import React from 'react';
import styled from 'styled-components';

import colors from 'lib/colors';
import { Typography } from 'components/ui';

export const SCalendarWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 25px;
  padding-bottom: 25px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;
export const SSelectedDate = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 137px;
  margin-top: 25px;
  margin-bottom: 15px;
  align-items: center;

  & > * {
    margin-right: 5px;
  }
`;

export const STitleWrap = styled.div`
  min-width: 125px;
  display: flex;
  flex-direction: row;
  border-right: 1px solid ${colors.gray500};
  margin-right: 12px;
`;

export const STagsWrap = styled.div`
  max-width: 760px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const STimeTag = styled((props) => {
  return <Typography variant="h5" {...props} />;
})`
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.palette.primary.main
      : props.theme.palette.primary.light};
  color: ${(props) =>
    props.isSelected ? 'white' : props.theme.palette.primary.main};
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 8px;
  margin-bottom: 12px;

  &:hover {
    cursor: pointer;
  }
`;
export const SEmptyHint = styled.span`
  color: ${(props) => props.theme.palette.text.secondary};
  font-weight: 500;
`;
