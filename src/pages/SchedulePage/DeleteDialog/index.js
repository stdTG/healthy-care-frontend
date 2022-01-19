import React from 'react';
import { Box as MuiBox } from '@material-ui/core';

import { Dialog } from 'components';
import getEventSettings from './getEventSettings';
import getAppointmentSettings from './getAppointmentSettings';

function DeleteDialog(props) {
  const { initialData, close } = props;

  const data = initialData?.isEvent
    ? getEventSettings(props)
    : getAppointmentSettings(props);

  return (
    <Dialog {...props} onClose={close} maxWidth="xs" title={data.title}>
      <MuiBox
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {data.content}
      </MuiBox>
      <MuiBox
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        {data.actions}
      </MuiBox>
    </Dialog>
  );
}

export default DeleteDialog;
