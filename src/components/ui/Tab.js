import React from 'react';
import styled from 'styled-components';
import { Tab as MuiTab } from '@material-ui/core';

const Tab = styled(MuiTab)`
  .MuiTab-wrapper {
    text-transform: none;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      font-size: 20px;
      margin-bottom: 0 !important;
      margin-right: 10px;
    }
  }
`;

export default Tab;
