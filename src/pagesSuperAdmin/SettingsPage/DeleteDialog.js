import React from 'react';
import {
  Box as MuiBox,
  CircularProgress as MuiCircularProgress,
} from '@material-ui/core';
import { Button, DeleteButton, Dialog } from 'components';
import { Typography } from 'components/ui';
import { useTranslation } from 'react-i18next';

function DeleteDialog(props) {
  const { close, onDelete, loading, shortName } = props;
  const { t } = useTranslation();

  return (
    <Dialog {...props} maxWidth="xs" title={t('Remove workspace')}>
      <MuiBox
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography mb={5}>
          {t('Do you want to remove this workspace?')}
        </Typography>
      </MuiBox>
      <MuiBox
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <Button onClick={close} icon="times" title={t('Cancel')} />

        <DeleteButton
          onClick={onDelete}
          title={
            loading.shortName === shortName ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <MuiCircularProgress
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
            ) : (
              t('Delete')
            )
          }
        />
      </MuiBox>
    </Dialog>
  );
}

export default DeleteDialog;
