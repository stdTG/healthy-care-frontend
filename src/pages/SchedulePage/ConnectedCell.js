import React from 'react';
import { none } from 'ramda';
import { getISODay } from 'date-fns';
import { useSelector } from 'react-redux';

import { selectors } from 'services/calendar';
import DateCellView from 'components/Calendar/components/DateCellView';
import { weekDaysEnum } from 'lib/enums/weekDays';

function ConnectedCell(props) {
  const workingHours = useSelector(selectors.getWorkingHours);

  const isInactive = none(
    (day) => getISODay(props.value) === weekDaysEnum[day.dayOfWeek].value,
    workingHours
  );

  return <DateCellView isInactive={isInactive} {...props} />;
}

export default ConnectedCell;
