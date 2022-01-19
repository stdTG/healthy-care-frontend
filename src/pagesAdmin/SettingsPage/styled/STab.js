import React from 'react';
import styled from 'styled-components';
import { Tab } from '@material-ui/core';
import { TabPanel as MuiTabPanel } from '@material-ui/lab';

const STab = styled(Tab)`
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

export const STabPanel = styled(MuiTabPanel)`
  padding: 24px 0;
`;

export default STab;
