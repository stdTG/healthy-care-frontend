import React from 'react';
import { Icon } from 'components/ui';
import ChipWithIcons from '../../../pages/PatientsPage/components/chips/ChipWithIcons';

const RoleButtonCell = ({ label, ...props }) => (
  <ChipWithIcons
    label={label}
    startIcon={<Icon icon="clipboard-list" />}
    background="#fff"
    {...props}
    color={label.toLowerCase() === 'admin' ? 'primary' : 'initial'}
  />
);

export default React.memo(RoleButtonCell);
