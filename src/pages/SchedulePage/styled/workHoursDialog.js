import React from 'react';
import styled from 'styled-components';
import {
  Typography as MuiTypography,
  Button as MuiButton,
} from '@material-ui/core';

import TimePicker from 'components/ui/TimePicker';
import colors from 'lib/colors';
import { Icon } from 'components/ui';

export const SFormTitle = styled((props) => (
  <MuiTypography color="textSecondary" {...props} />
))`
  width: 270px;
  border-left: 1px solid ${colors.gray100};
  padding: 0 12px 12px 12px;
`;

export const SFormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

// export const SDayTitle = styled.div`
//   font-size: 16px;
//   font-weight: 600;
//   line-height: 22px;
//   text-align: right;
//   margin-right: 12px;
//
//   color: ${(props) =>
//     props.isActive ? 'black' : props.theme.palette.text.secondary};
// `;

// export const STimePickerWrap = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-column-gap: 12px;
//   padding: ${(props) => props.padding};
//   width: 270px;
//   border-left: 1px solid ${colors.gray100};
//   color: ${colors.gray100};
//   font-size: 16px;
//   font-weight: 500;
//   line-height: 22px;
// `;

// export const STimePicker = styled((props) => (
//   <TimePicker
//     allowClear={true}
//     use12Hours={true}
//     suffixIcon={() => <Icon icon="date" />}
//     showNow={false}
//     minuteStep={30}
//     format="hh:mm a"
//     popupStyle={{
//       zIndex: 9999,
//     }}
//     {...props}
//   />
// ))`
//   border: ${(props) => (props.isError ? '1px solid red' : null)};
//   margin-bottom: 6px;
//   border-radius: 10px;
//   margin-right: ${(props) => props.marginRight};
//   .ant-picker:hover {
//     border: ${(props) =>
//       props.isError ? '1px solid red' : '1px solid #40a9ff'};
//   }
// `;

export const SSaveButton = styled((props) => (
  <MuiButton color="primary" variant="contained" {...props} />
))`
  padding: 10px 16px;
  border-radius: 18px;
`;
