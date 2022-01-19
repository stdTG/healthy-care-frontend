import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled((props) => {
  return (
    <FontAwesomeIcon
      size={props.size}
      {...props}
      icon={[props.type || 'far', props.icon]}
    />
  );
})`
  color: ${(props) =>
    props.color ? props.theme.palette[props.color].main : 'inherit'};
  margin-right: ${(props) => props.mr}px;
  margin-left: ${(props) => props.ml}px;
  margin-bottom: ${(props) => props.mb}px;
  margin-top: ${(props) => props.mt}px;
`;

Icon.propsTypes = {
  mr: PropTypes.number,
  size: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.oneOf(['fal', 'far', 'fas']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'warning',
    'info',
  ]),
};

export default Icon;
