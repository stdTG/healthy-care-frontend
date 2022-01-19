import React from 'react';
import { STimeSlot } from 'components/Calendar/styled/timeSlotView';

function TimeSlot(props) {
  const { isInactive, children, isLunchTime } = props;

  return (
    <STimeSlot
      className="rbc-time-slot"
      isInactive={isInactive}
      isLunchTime={isLunchTime}
    >
      {children}
    </STimeSlot>
  );
}

export default TimeSlot;
