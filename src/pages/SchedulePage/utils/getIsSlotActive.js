import { formatISO, getISODay, parseISO } from 'date-fns';
import { find } from 'ramda';
import { weekDaysEnum } from 'lib/enums/weekDays';

function getIsSlotActive(props) {
  const { value, workingHours } = props;

  const targetDate = formatISO(value, { representation: 'date' }) + 'T';
  const activeDay = find(
    (item) => weekDaysEnum[item.dayOfWeek].value === getISODay(value),
    workingHours
  );

  let isInactiveHour = false;
  let isLunchTime = false;

  if (activeDay) {
    const time = value;

    const min = parseISO(targetDate + activeDay.startTime);
    const max = parseISO(targetDate + activeDay.endTime);

    const lunchMin = parseISO(targetDate + activeDay.startLunchTime);
    const lunchMax = parseISO(targetDate + activeDay.endLunchTime);

    isInactiveHour = time < min || time >= max;
    isLunchTime = time >= lunchMin && time < lunchMax;
  }
  return {
    isInactiveHour,
    isLunchTime,
    activeDay,
  };
}

export default getIsSlotActive;
