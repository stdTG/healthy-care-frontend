import {
  Box as MuiBox,
  Paper as MuiPaper,
  Typography as MuiTypography,
} from '@material-ui/core';
import { Icon } from 'components/ui';
import React from 'react';

import styled from 'styled-components';
const SPaper = styled((props) => <MuiPaper elevation={24} {...props} />)`
  position: relative;
  padding: ${(props) => props.theme.spacing(3)}px;
  overflow: hidden;
`;

const Card = (props) => {
  const { icon, title, EditButton, children, height, customTitle } = props;
  return (
    // <SPaper style={{ height: height || 'auto' }}> <-- Was before
    <SPaper className="card">
      <MuiBox
        justifyContent="space-between"
        alignItems="baseline"
        display="flex"
        mb={2}
      >
        {customTitle || (
          <MuiTypography variant="h4">
            <Icon icon={icon} style={{ fontSize: '20px' }} mr={10} />
            {title}
          </MuiTypography>
        )}

        {EditButton}
      </MuiBox>

      <section>{children}</section>
    </SPaper>
  );
};

export default Card;
