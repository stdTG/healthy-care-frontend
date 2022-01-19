import React from 'react';

import TimeSlot from 'components/Calendar/components/TimeSlotView';
import getIsSlotActive from 'pages/SchedulePage/utils/getIsSlotActive';
import { useSelector } from 'react-redux';
import { selectors } from 'services/calendar';

function ConnectedSlot(props) {
  const workingHours = useSelector(selectors.getWorkingHours);
  const { activeDay, isInactiveHour, isLunchTime } = getIsSlotActive({
    value: props.value,
    workingHours,
  });

  return (
    <TimeSlot
      isInactive={!activeDay || isInactiveHour || isLunchTime}
      isLunchTime={isLunchTime}
      {...props}
    />
  );
}

export default ConnectedSlot;
