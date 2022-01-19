import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Button as MuiButton,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';

import { Icon } from 'components/ui';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #eee',
    borderRadius: '18px',
    boxShadow: '0 5px 15px 0 rgba(0,0,0,0.1)',
  },
  list: {
    padding: '0',
  },
})((props) => (
  <MuiMenu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

const SMenuItem = styled(MuiMenuItem)`
  padding: 0 15px 0 15px;
  border: 1px solid #eee;
  margin: 5px 12px;
  border-radius: 18px;
  color: ${(props) =>
    props.color
      ? props.theme.palette[props.color].main
      : props.theme.palette.primary.main};
  height: 46px;

  &:hover {
    background-color: ${(props) =>
      props.color
        ? props.theme.palette[props.color].main
        : props.theme.palette.primary.main};
    color: white;
  }
`;

const Menu = function (props) {
  const { options } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          height: '30px',
          width: '30px',
          borderRadius: '50%',
          minWidth: '20px',
        }}
      >
        <Icon icon="ellipsis-v" size="1x" />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((item) => (
          <SMenuItem color={item.color}>
            {item.icon && <Icon icon={item.icon} mr={10} />}
            <ListItemText primary={item.label} onClick={item.onClick} />
          </SMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default Menu;
