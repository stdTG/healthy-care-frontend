import React, { useRef, useMemo, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TableContext } from '../../../index';
import { Icon } from 'components/ui';
import { ChipWithIcons } from '../../../components';
import { PatientActionsMenu } from './Menu';
import { useActionMenuHandler } from '../../../hooks';
import { useTranslation } from 'react-i18next';

const PatientActions = ({ patientId }) => {
  const anchorRef = useRef(null);
  const history = useHistory();

  const [
    open,
    onOpenMenu,
    handleListKeyDown,
    onCloseMenu,
  ] = useActionMenuHandler(anchorRef);

  const { onAddCarePlan, onOpenAppointmentDialog } = useContext(TableContext);
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      {
        label: t('Send message'),
        action: () => history.push('/chat'),
        icon: 'comment-lines',
      },
      {
        label: t('Schedule appointment'),
        action: () => onOpenAppointmentDialog(patientId),
        icon: 'calendar-plus',
      },
      {
        label: t('Share record'),
        action: () => {},
        icon: 'share',
      },
      {
        label: t('Add protocol'),
        action: () => onAddCarePlan(patientId),
        icon: 'hands-heart',
        variant: 'contained',
      },
    ],
    [patientId]
  );

  return (
    <>
      <div ref={anchorRef}>
        <ChipWithIcons
          label={<Icon icon="ellipsis-v" />}
          background="#fff"
          onClick={onOpenMenu}
        />
      </div>
      <PatientActionsMenu
        open={open}
        anchorRef={anchorRef}
        onCloseMenu={onCloseMenu}
        handleListKeyDown={handleListKeyDown}
        options={options}
      />
    </>
  );
};

export default PatientActions;
