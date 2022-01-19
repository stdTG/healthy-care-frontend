import { format } from 'date-fns';

import { timeType as TimeType } from 'lib/enums/time';

const getTimeInterval = (startTime, endTime, timeType) => {
  const allHours = Array(24)
    .fill(null)
    .map((_, i) => i);

  const enabledHours = [];

  const formattedStartTime = +format(startTime, 'H');
  const formattedEndTime = +format(endTime, 'H');

  for (let i = formattedStartTime; i <= formattedEndTime; i++) {
    enabledHours.push(i);
  }

  const disabledHoursPm = allHours.filter(
    (time) => !enabledHours.includes(time)
  );

  if (timeType === TimeType.PM) {
    return disabledHoursPm;
  }

  if (timeType === TimeType.AM) {
    return disabledHoursPm.filter((time) => time < 12);
  }

  return disabledHoursPm;
};

export default getTimeInterval;
