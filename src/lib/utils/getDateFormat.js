import { not } from 'ramda';

function getDateFormat(date) {
  let newDate = date;

  if (not(date instanceof Date)) {
    newDate = new Date(date + '.000Z');
  }
  return newDate;
}

export default getDateFormat;
