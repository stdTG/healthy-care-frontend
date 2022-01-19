import React, { useMemo } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const StatusCell = ({ label, onClick, ...props }) => {
  const background = useMemo(() => {
    if (label && label.toLowerCase() === 'online') {
      return '#00A152';
    } else if (label && label.toLowerCase() === 'busy') {
      return '#F19D3A';
    }
    return '#CCCCCC';
  }, [label]);

  return (
    <StyledButton
      {...props}
      variant="outlined"
      onClick={onClick}
      background={background}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  min-width: auto;
  border: ${({ border }) => (border ? border : '1px solid #eceff1')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '30px'};
  background: ${({ background }) => (background ? background : '#f5f5f5')};
  color: ${({ color }) => (color ? color : '#000')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '1.1rem')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  text-transform: capitalize;

  :hover {
    color: #000;
  }
`;

export default React.memo(StatusCell);
