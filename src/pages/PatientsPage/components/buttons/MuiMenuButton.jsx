import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Icon } from 'components/ui'

const MuiMenuButton = styled(({ label, icon, action, variant, ...props }) => (
    <Button
      {...props}
      size="medium"
      variant={variant}
      color='primary'
      onClick={action}
      startIcon={<Icon icon={icon} style={{ fontSize: '16px' }} />}
    >
      {label}
    </Button>
))`
  margin: 0 16px;
  justify-content: flex-start;
`

export default MuiMenuButton