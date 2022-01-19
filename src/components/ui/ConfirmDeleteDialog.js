import React from 'react';
import {
  Box as MuiBox,
  CircularProgress as MuiCircularProgress,
} from '@material-ui/core';
import { Button, DeleteButton, Dialog } from 'components';
import { Typography } from 'components/ui';
import { useTranslation } from 'react-i18next';

const ConfirmDeleteDialog = (props) => {
  const { close, dialogTitle, warningMessage, initialData } = props;
  const { t } = useTranslation();

  return (
    <Dialog {...props} maxWidth="xs" title={dialogTitle} onClose={close}>
      <MuiBox
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography mb={5}>{warningMessage}</Typography>
      </MuiBox>
      <MuiBox
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <Button
          onClick={() => close({ isDeleted: false })}
          icon="times"
          title={t('Cancel')}
        />

        <DeleteButton
          onClick={() => close({ ...initialData, isDeleted: true })}
          title={
            initialData?.loading ? (
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
};

export default ConfirmDeleteDialog;
