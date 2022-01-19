import React from 'react'
import { Button } from '@material-ui/core';
import styled from 'styled-components'

const ChipLabel = styled(({ label, onClick, ...props  }) => (
    <Button
      {...props}
      variant='outlined'
      onClick={onClick}
    >
      {label}
    </Button>
))`
  min-width: auto;
  border: ${({ border }) => border ? border : '1px solid #eceff1'};
  border-radius: ${ ({borderRadius}) => borderRadius ? borderRadius : '18px'};
  background: ${ ({background}) => background ? background : '#f5f5f5'};
  color: ${ ({color}) => color ? color : '#000'};
  line-height: ${ ({lineHeight}) => lineHeight ? lineHeight : '2rem'};
  margin: ${ ({margin}) => margin ? margin : '0' };

  :hover {
    color: #000;
  }
`;

export default React.memo(ChipLabel)