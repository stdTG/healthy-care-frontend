import React, { FC } from 'react';
import { CircularProgress, TableContainer as MuiTableContainer, TableContainerTypeMap } from '@material-ui/core';
import styled from 'styled-components'

const AppTableContainer: FC<Props> = ({ loading, style, children , ...props}) => {
  return (
    <MuiTableContainer {...props} style={{
      ...style,
      position: 'relative',
      display:'grid',
      gridTemplateRows:' auto 1fr auto ',
      minHeight: 'auto',
    }}>
      {children}
      {loading && (
        <SpinnerWrap>
          <CircularProgress size={35}/>
        </SpinnerWrap>
      )}
    </MuiTableContainer>
  )
}

export default AppTableContainer

const SpinnerWrap = styled.div`
  position: absolute;
  width: inherit;
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

interface Props extends Partial<TableContainerTypeMap> {
  loading?: boolean
  style?: any
}
