import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components'

const CardSpinner: FC<Props> = ({size}) => {
  return (
    <CircularProgressWrap>
      <CircularProgress size={size}/>
    </CircularProgressWrap>
  )
}

export default CardSpinner

const CircularProgressWrap = styled.div`
  position: absolute;
  width: 100%;
  height: inherit;
  background-color: white;
  opacity: 0.7;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`
interface Props {
  size: number
}
