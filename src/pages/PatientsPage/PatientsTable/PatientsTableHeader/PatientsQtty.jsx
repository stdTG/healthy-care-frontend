import { useContext } from 'react';
import { TableContext } from '../../index'
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const PatientsQtty = () => {
  const { paginationInfo } = useContext(TableContext)
  const { t } = useTranslation();

    return (
      <Typography style={{ margin: '20px' }}>
        {!paginationInfo ? t('Patients') : paginationInfo.totalItems + ' ' + t('patients') }
      </Typography>
    )
}
