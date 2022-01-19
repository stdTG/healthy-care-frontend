import React from 'react';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';

import { Icon } from 'components/ui';
import Dialog from 'components/Dialogs';
import { SButton } from '../styled/createSuccessDialog';
import styled from 'styled-components';
import colors from '../../../lib/colors/index';
import { useTranslation } from 'react-i18next';

function CreateSuccessDialog(props) {
  const { initialData, close } = props;
  const { t } = useTranslation();

  if (!initialData) return null;

  const createNewUser = () => {
    close({ createNew: true });
  };

  return (
    <Dialog {...props} title={t('User added')} onClose={close}>
      <SFrame>
        <MuiBox display="flex" p="20px 20px 30px" alignItems="center">
          <Icon type="fal" icon="address-card" size="2x" />
          <MuiTypography variant="h5" style={{ marginLeft: '10px' }}>
            {initialData.firstName} {initialData.lastName}
          </MuiTypography>
        </MuiBox>
      </SFrame>

      <MuiBox display="flex" flexDirection="column" alignItems="center" mb={2}>
        {initialData.sendEmail ? (
          <MuiTypography variant="subtitle1" gutterBottom>
            <Icon color="primary" size="1x" icon="envelope" mr={10} />
            {t('Invitation email sent')}
          </MuiTypography>
        ) : null}
        {initialData.sendSms ? (
          <MuiTypography variant="subtitle1" gutterBottom>
            <Icon color="primary" size="1x" icon="mobile" mr={10} />
            {t('Invitation sms sent')}
          </MuiTypography>
        ) : null}

        <SButton size="medium" variant="contained" onClick={createNewUser}>
          <Icon icon="user-plus" size="1x" mr={5} /> {t('Add other user')}
        </SButton>
      </MuiBox>
    </Dialog>
  );
}

export default CreateSuccessDialog;

export const SFrame = styled('div')`
  border: 1px solid ${colors.gray500};
  border-radius: 10px;

  position: relative;
  margin-bottom: 25px;
`;
