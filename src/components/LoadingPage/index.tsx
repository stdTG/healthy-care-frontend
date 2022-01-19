import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components'

const LoadingPage: FC<Props> = () => {
  return (
    <SpinnerWrap>
      <CircularProgress size={50}/>
    </SpinnerWrap>
  )
}

export default LoadingPage

const SpinnerWrap = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {}
