import React from 'react'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { Icon } from 'components/ui'
import { useTranslation } from 'react-i18next';

const SwitchFilterButton = styled(({ isOpen, toSwitch, ...props }) => {
  const { t } = useTranslation();

  return (
    <Button
      {...props}
      variant="contained"
      startIcon={
        <Icon icon="filter" color={isOpen ? 'primary' : undefined} />
      }
      onClick={toSwitch}
    >
      <Typography variant="h3" color={isOpen ? 'primary' : undefined}>
        {t('Filters')}
      </Typography>
    </Button>
  )
})`
  background: whie;
  padding: 12px 24px;
  color: #000;
`

export default React.memo(SwitchFilterButton)
