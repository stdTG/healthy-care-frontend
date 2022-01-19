import React from 'react';
import {
  Typography as MuiTypography,
  Grid as MuiGrid,
} from '@material-ui/core';

import useDialog from 'lib/hooks/useDialog';
import { Icon } from 'components/ui';
import SPaper from './styled/SPaper';
import SRecordActionButton from './styled/SRecordActionButton';
import RecordShareDialog from './RecordShareDialog';
import ReccordShareSuccessDialog from './ReccordShareSuccessDialog';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RecordActions({ onAddCarePlan, onOpenAppointmentDialog, patientId }) {
  const recordShareDialog = useDialog();
  const reccordShareSuccessDialog = useDialog();

  const history = useHistory();
  const { t } = useTranslation();

  async function openRecordShareDialog() {
    const result = await recordShareDialog.open();
    if (!result || !result.data) {
      return;
    } else {
      const success = await reccordShareSuccessDialog.open();
    }
  }

  return (
    <SPaper>
      <MuiGrid container spacing={2}>
        <MuiGrid item xs={6}>
          <SRecordActionButton onClick={() => history.push('/chat')}>
            <Icon icon="comment-lines" size="lg" />
            <MuiTypography display="block">{t('Send message')}</MuiTypography>
          </SRecordActionButton>
          <SRecordActionButton
            onClick={() => onOpenAppointmentDialog(patientId)}
          >
            <Icon icon="calendar-plus" size="lg" />
            <MuiTypography display="block">
              {t('Schedule appointment')}
            </MuiTypography>
          </SRecordActionButton>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <SRecordActionButton
            onClick={() => onAddCarePlan(patientId)}
            style={{ background: '#2164E8', color: '#ffffff' }}
          >
            <Icon icon="hands-heart" size="lg" />
            <MuiTypography display="block">{t('Add protocol')}</MuiTypography>
          </SRecordActionButton>
          <SRecordActionButton onClick={openRecordShareDialog}>
            <Icon icon="share" size="lg" />
            <MuiTypography display="block">{t('Share record')}</MuiTypography>
          </SRecordActionButton>
        </MuiGrid>
      </MuiGrid>

      <RecordShareDialog
        isOpen={recordShareDialog.isOpen}
        close={recordShareDialog.close}
        initialData={recordShareDialog.initialData}
      />
      <ReccordShareSuccessDialog
        isOpen={reccordShareSuccessDialog.isOpen}
        close={reccordShareSuccessDialog.close}
        initialData={reccordShareSuccessDialog.initialData}
      />
    </SPaper>
  );
}

export default RecordActions;
