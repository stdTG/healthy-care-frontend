import styled from 'styled-components'
import { Grid } from '@material-ui/core';

export const FormFieldsContainer = styled(({ children, ...props }) => (
  <Grid
    {...props}
    container
    spacing={2}
    direction="column"
  >
    {children}
  </Grid>
))`
  height: auto;
  
  .preloader {
    height: 236px;
    display: grid;
    place-items: center;
  }
`