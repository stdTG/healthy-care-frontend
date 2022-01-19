import React from 'react';
import PropTypes from 'prop-types';
import { Box as MuiBox } from '@material-ui/core';
import styled from 'styled-components';

const Space = styled(MuiBox)`
  & > * {
    vertical-align: bottom;
    margin-right: ${(props) =>
      props.size === 'small'
        ? props.theme.spacing(1)
        : props.size === 'medium'
        ? props.theme.spacing(2)
        : props.theme.spacing(3)}px;
    margin-bottom: ${(props) =>
      props.flexDirection === 'column'
        ? props.size === 'small'
          ? props.theme.spacing(1)
          : props.size === 'medium'
          ? props.theme.spacing(2)
          : props.theme.spacing(3)
        : '0'}px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

Space.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Space.defaultProps = {
  size: 'small',
};

export default Space;
