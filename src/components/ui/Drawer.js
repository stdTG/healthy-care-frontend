import styled from 'styled-components';

import { Drawer as MuiDrawer } from '@material-ui/core';
import React from 'react';

const Drawer = styled(({ className, backgroundColor, ...props }) => (
  <MuiDrawer {...props} className={className} classes={{ paper: className }} />
))`
  overflow-x: hidden;
  width: 450px;
  padding: 22px;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  left: ${(props) => props.left};
  border: ${(props) => props.border};
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
  width: 0;
  }
  
}
`;

export default Drawer;
