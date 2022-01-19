import { isEmpty, isNil } from 'ramda';

const getIsActiveDay = (dayData) => {
  return (
    !(isNil(dayData.startTime) || isEmpty(dayData.startTime)) &&
    !(isNil(dayData.endLunchTime) || isEmpty(dayData.endLunchTime)) &&
    !(isNil(dayData.endTime) || isEmpty(dayData.endTime)) &&
    !(isNil(dayData.startLunchTime) || isEmpty(dayData.startLunchTime))
  );
};

export default getIsActiveDay;
