import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Icon } from 'components/ui';
import { useTranslation } from 'react-i18next';

const NewPatientButton = styled(({ onClick, ...props }) => {
  const { t } = useTranslation();

  return (
    <Button
      {...props}
      size="medium"
      variant="contained"
      onClick={onClick}
      startIcon={<Icon icon="user-plus" size="1x" />}
    >
      {t('New patient')}
    </Button>
  )
})`
  white-space: nowrap;
  min-width: auto;
`

export default NewPatientButton
