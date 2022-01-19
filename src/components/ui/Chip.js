import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Chip as MuiChip } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

import colors from 'lib/colors';

//TODO refactor
const Chip = styled(({ className, color, ...props }) => (
  <MuiChip
    {...props}
    className={className}
    classes={{ icon: 'icon', label: 'label' }}
  />
))`
  background-color: ${(props) =>
    props.variant === 'outlined'
      ? 'transparent'
      : props.color === 'default'
      ? fade(colors.black, 0.03)
      : props.theme.palette[props.color].light};
  color: ${(props) =>
    props.color === 'default'
      ? colors.black
      : props.theme.palette[props.color].main};

  border: ${(props) =>
    props.variant === 'outlined' ? '1px solid #eee' : 'none'};
  border-radius: 10px;
  font-weight: 600;
  height: ${(props) => (props.size === 'small' ? 'initial' : '32px')};
  padding: 4px;
  min-width: 32px;

  & .icon {
    color: ${(props) =>
      props.color === 'default'
        ? colors.black
        : props.theme.palette[props.color].main};
    margin-left: ${(props) => (props.label ? '5px' : 0)};
    font-size: 15px;
  }

  & .label {
    padding-right: ${(props) => (props.label ? '12px' : 0)};
    padding-left: ${(props) => (props.label ? '12px' : '5px')};
  }
`;

Chip.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'warning',
    'info',
    'default',
  ]),
};
Chip.defaultProps = {
  color: 'default',
};

export default Chip;
