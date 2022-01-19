import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography as MuiTypography,
  Button as MuiButton,
  Box as MuiBox,
} from '@material-ui/core';

import { Icon } from 'components/ui';
import { countAge } from 'lib/utils';
import { SEX, sexData } from 'lib/enums/sex';
import Dialog from 'components/Dialogs';
import { SFrame, SAlignButton, SButton } from './styled/createSuccessDialog';
import { useTranslation } from 'react-i18next';

function CreateSuccessDialog(props) {
  const history = useHistory();
  const { initialData = {}, close } = props;
  const { t } = useTranslation();

  if (!initialData) return null;

  const createNewPatient = () => {
    close({ createNew: true });
  };

  return (
    <Dialog {...props} onClose={close} title={t('Patient added')}>
      <SFrame>
        <MuiBox display="flex" p="20px 20px 30px">
          <Icon type="fal" icon="address-card" size="2x" />
          <MuiBox textAlign="left" ml="10px">
            <MuiTypography variant="h5">
              {initialData.firstName} {initialData.lastName}
            </MuiTypography>
            <div>
              {initialData.sex && initialData.sex !== SEX.undefined && (
                <>
                  <Icon icon={sexData[initialData.sex].icon} size="1x" />
                  <span style={{ margin: '5px' }}>&sdot;</span>
                </>
              )}
              {countAge(initialData.birthDate)}
            </div>
          </MuiBox>
        </MuiBox>
        <SAlignButton>
          <MuiButton
            size="small"
            color="primary"
            variant="contained"
            onClick={() => {
              history.push(`/patientRecord/${initialData.id}`);
            }}
          >
            <Icon icon="pen" size="1x" mr={10} /> {t('Edit record')}
          </MuiButton>
        </SAlignButton>
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

        <SButton size="medium" variant="contained" onClick={createNewPatient}>
          <Icon icon="user-plus" size="1x" mr={5} /> {t('Add other patient')}
        </SButton>
      </MuiBox>
    </Dialog>
  );
}

export default CreateSuccessDialog;
