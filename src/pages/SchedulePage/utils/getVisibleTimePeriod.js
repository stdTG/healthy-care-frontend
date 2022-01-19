import {
  formatISO,
  getISODay,
  parseISO,
  set,
  min as minFn,
  max as maxFn,
} from 'date-fns';
import { find } from 'ramda';
import { weekDaysEnum } from 'lib/enums/weekDays';

export function getVisibleTimePeriodWeek(workingHours) {
  if (workingHours.length === 0) return { min: null, max: null };
  const currentDate = formatISO(new Date(), { representation: 'date' }) + 'T';

  const formattedWorkingHoursStartDate = workingHours.map((workingHour) => {
    return parseISO(currentDate + workingHour.startTime);
  });
  const formattedWorkingHoursEndDate = workingHours.map((workingHour) => {
    return parseISO(currentDate + workingHour.endTime);
  });

  return {
    min: minFn(formattedWorkingHoursStartDate),
    max: maxFn(formattedWorkingHoursEndDate),
  };
}

export function getVisibleTimePeriodDay(workingHours, day) {
  const staticDate = formatISO(day, { representation: 'date' }) + 'T';

  const targetDay = find(
    (item) => weekDaysEnum[item.dayOfWeek].value === getISODay(day),
    workingHours
  );

  if (!targetDay) {
    return {
      min: set(day, { hours: 7, minutes: 0 }),
      max: set(day, { hours: 18, minutes: 0 }),
    };
  }
  return {
    min: parseISO(staticDate + targetDay.startTime),
    max: parseISO(staticDate + targetDay.endTime),
  };
}

function getVisibleTimePeriod(workingHours, day) {
  if (day) {
    return getVisibleTimePeriodDay(workingHours, day);
  }
  return getVisibleTimePeriodWeek(workingHours);
}

export default getVisibleTimePeriod;
