import React from 'react'
import { Button } from '@material-ui/core';
import styled from 'styled-components'

const ChipWithIcons = styled(({ label, onClick, ...props }) => (
  <Button
    {...props}
    variant='outlined'
    onClick={onClick}
  >
    {label}
  </Button>
))`
  color: ${({ color }) => color ? color : 'black'};
  border-radius: 18px;
  border: ${({ border }) => border ? border : '1px solid #eceff1'};
  background: ${({ background }) => background ? background : '#f5f5f5'};
  margin: ${ ({margin}) => margin ? margin : '0' };
  min-width: 42px;
  height: 42px;
`

export default React.memo(ChipWithIcons)
