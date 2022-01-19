import styled from 'styled-components';
import {
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemIcon,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

export const SIcon = styled(MuiListItemIcon)`
  margin: 5px auto;
  color: white;
  min-width: auto;
  font-size: 20px;
`;

export const SNavLink = styled(NavLink)``;

export const SListItem = styled(MuiListItem)`
  ${({ theme }) => `
    border-radius: 20px;
    color: ${theme.palette.primary.main};
    margin: 5px auto;
    height: 50px;
    width: 50px;
  
    &:hover {
      background-color: ${theme.palette.primary.dark};
    }
  
    ${SNavLink}.selectedItem & {
      background-color: ${theme.palette.primary.dark};
    }
  `}
`;
