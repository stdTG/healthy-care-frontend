import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Chip as MuiChip } from '@material-ui/core';

import Icon from './Icon';

const IconButton = styled(({ className, color, icon, ...props }) => (
  <MuiChip
    {...props}
    icon={<Icon icon={icon} />}
    className={className}
    classes={{ icon: 'icon', label: 'label' }}
  />
))`
  background-color: ${(props) => props.theme.palette[props.color].light};
  color: ${(props) => props.theme.palette[props.color].main};

  border: none;
  border-radius: 10px;
  font-weight: 600;
  height: 32px;
  padding: 4px;
  min-width: 32px;

  & .icon {
    color: ${(props) => props.theme.palette[props.color].main};
    margin-left: 0;
    font-size: 15px;
  }

  & .label {
    padding-right: 0;
    padding-left: 5px;
  }
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.palette[props.color].main};
    color: ${(props) => props.theme.palette.common.white};
  }
  &:hover .icon,
  &:focus .icon {
    color: ${(props) => props.theme.palette.common.white};
  }
`;

IconButton.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'warning',
    'info',
  ]),
};
IconButton.defaultProps = {
  color: 'primary',
};

export default IconButton;
