import React from 'react';
import FormDialog from 'components/Dialogs/FormDialog';
import SFrame from './styled/SFrame';
import { Icon } from 'components/ui';

import { useTranslation } from 'react-i18next';
import SeeButton from 'components/Buttons/SeeButton';

import {
  Typography as MuiTypography,
  Button as MuiButton,
  Box as MuiBox,
} from '@material-ui/core';

function ReccordShareSuccessDialog(props) {
  const { close, initialData, isOpen } = props;

  const { t } = useTranslation();

  const actions = [
    <MuiBox display="flex" justifyContent="flex-start" mt={1}>
      <SeeButton
        onClick={console.log}
        // disabled={loading || invalid}
        title={t('See all shared records')}
        type="submit"
      />
    </MuiBox>,
  ];

  function onSave() {
    close({});
  }

  return (
    <FormDialog
      title={t('Record shared')}
      onSubmit={onSave}
      actions={actions}
      onClose={close}
      {...props}
    >
      {() => {
        return (
          <div>
            <MuiTypography>
              Share this link to access the records:
            </MuiTypography>

            <SFrame p="10px 10px 10px" mt="5px">
              <MuiTypography variant="h5">
                https://alakin.com/record/1r5ahs8s8sD
              </MuiTypography>
            </SFrame>

            <MuiBox textAlign="right" mt="10px" ml="10px">
              <MuiButton
                key="save"
                type="submit"
                color="primary"
                variant="contained"
              >
                <Icon
                  icon="copy"
                  size="1x"
                  mr={5}
                  style={{ marginBottom: '1px', marginRight: '10px' }}
                />
                {t('Copy link')}
              </MuiButton>
            </MuiBox>
          </div>
        );
      }}
    </FormDialog>
  );
}

export default ReccordShareSuccessDialog;
