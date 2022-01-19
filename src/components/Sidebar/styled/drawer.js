import React from 'react';
import styled from 'styled-components';
import { Drawer as MuiDrawer } from '@material-ui/core';

// import { ReactComponent as Logo } from 'lib/icons/logo.svg';
import logo from 'lib/icons/logo_white.png';

const Logo = () => (
  <div style={{ padding: '15px' }}>
    <img src={logo} width={50} height={50} />
  </div>
);

export const SLogo = styled(Logo)`
  margin: 20px auto 0;
  height: 60px;
`;

export const SListContainer = styled('div')`
  display: flex;
  height: ${(props) => props.height || 'auto'};
  flex-direction: column;
  justify-content: center;
`;

export const SDrawer = styled(({ className, ...props }) => (
  <MuiDrawer {...props} className={className} classes={{ paper: className }} />
))`
  ${({ theme }) => `
    background-color: ${theme.palette.primary.main};
    overflow-x: hidden;
    width: 80px;`}
`;
