import {
  differenceInWeeks,
  differenceInYears,
  differenceInDays,
  parseISO,
} from 'date-fns';
import { not } from 'ramda';

const countAge = (birthday) => {
  if (not(birthday instanceof Date)) {
    birthday = parseISO(birthday);
  }
  let age = differenceInYears(new Date(), birthday);
  let type = ' y.o.';

  if (age === 0) {
    age = differenceInWeeks(new Date(), birthday);
    type = ' weeks';
  }

  if (age === 0) {
    age = differenceInDays(new Date(), birthday);
    type = ' days';
  }

  return age + type;
};

export default countAge;

export const countYears = (date) => {
  let period = differenceInYears(new Date(), date);
  let type = ' years ago';

  if (period === 0) {
    period = differenceInWeeks(new Date(), date);
    type = ' weeks ago';
  }

  if (period === 0) {
    period = differenceInDays(new Date(), date);
    type = ' days ago';
  }

  if (period === 0) {
    period = differenceInDays(new Date(), date);
    type = 'new';
  }

  return period === 0 ? type : period + type;
};

export const dateTypes = {
  years: 1,
  weeks: 2,
  days: 3,
  new: 4,
};

export const dateTypesData = {
  [dateTypes.years]: {
    title: 'years',
    code: 1,
  },
  [dateTypes.weeks]: {
    title: 'weeks',
    code: 2,
  },
  [dateTypes.days]: {
    title: 'days',
    code: 3,
  },
  [dateTypes.new]: {
    title: 'new',
    code: 4,
  },
};

export const countDuration = (startDate, endDate = new Date()) => {
  let period = differenceInYears(endDate, startDate);
  let type = dateTypes.years;

  if (period === 0) {
    period = differenceInWeeks(endDate, startDate);
    type = dateTypes.weeks;
  }

  if (period === 0) {
    period = differenceInDays(endDate, startDate);
    type = dateTypes.days;
  }

  if (period === 0) {
    type = dateTypes.new;
  }
  return {
    period,
    type,
  };
};
