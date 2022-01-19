import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as MuiAvatar } from '@material-ui/core';
import styled from 'styled-components';

const Avatar = styled(({ className, ...props }) => (
  <MuiAvatar {...props} className={className} />
))`
  width: ${(props) =>
    props.size === 'small'
      ? props.theme.spacing(3)
      : props.size === 'medium'
      ? props.theme.spacing(6)
      : props.size === 'xlarge'
      ? props.theme.spacing(14)
      : props.theme.spacing(12)}px;
  height: ${(props) =>
    props.size === 'small'
      ? props.theme.spacing(3)
      : props.size === 'medium'
      ? props.theme.spacing(6)
      : props.size === 'xlarge'
      ? props.theme.spacing(14)
      : props.theme.spacing(12)}px;
`;

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
};

Avatar.defaultProps = {
  size: 'medium',
};

export default Avatar;
