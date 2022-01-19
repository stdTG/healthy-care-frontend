import React from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { SHeader } from 'components/Calendar/styled/dateCell';

function DateCellHeader(props) {
  const { label, isOffRange, date } = props;

  return (
    <SHeader
      isCurrentDate={differenceInCalendarDays(date, new Date()) === 0}
      isOffRange={isOffRange}
      isDisabled={false}
    >
      {label}
    </SHeader>
  );
}

export default DateCellHeader;
