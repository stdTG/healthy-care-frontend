import React, { FC } from 'react';
import { Typography as MuiTypography } from '@material-ui/core';
import styled from 'styled-components';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { TypographyTypeMap } from '@material-ui/core/Typography/Typography';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';

const StandardTypography = styled(MuiTypography)<Props>`
  margin-bottom: ${(props) => (props.mb ? 0.25 * props.mb : 0)}rem;
`;

const UpperTypography = styled(MuiTypography)<Props>`
  margin-bottom: ${(props) => (props.mb ? 0.25 * props.mb : 0)}rem;
  font-size: 13px;
  font-weight: bold;
  color: #ccc;
`;

const Typography: FC<any> = ({ upper, ...props }) => {
  return upper ? (
    <UpperTypography {...props} />
  ) : (
    <StandardTypography {...props} />
  );
};

export default Typography;

// interface TypographyProps extends a {
//   upper?: boolean
// }

interface Props{
  mb?: number,
};
