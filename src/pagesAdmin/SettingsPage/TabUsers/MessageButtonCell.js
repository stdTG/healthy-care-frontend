import React from 'react';
import ChipWithIcons from '../../../pages/PatientsPage/components/chips/ChipWithIcons';
import { Icon } from 'components/ui';

const MessageButtonCell = () => {
  return <ChipWithIcons label={<Icon icon="comment" />} background="#fff" />;
};

export default React.memo(MessageButtonCell);
