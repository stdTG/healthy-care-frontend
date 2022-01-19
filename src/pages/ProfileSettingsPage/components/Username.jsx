import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const Username = styled(({ firstName, lastName, ...props }) => (
  <Typography
    {...props}
    variant="h4"
  >
    {firstName} {lastName}
  </Typography>
))`
  font-weight: bold;
  margin-top: 20px;
  white-space: nowrap;
`

export default React.memo(Username)