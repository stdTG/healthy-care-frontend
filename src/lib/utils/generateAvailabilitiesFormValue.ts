import weekDays from '../enums/weekDays';

export const generateAvailabilitiesFormValue = (value: any) => {
  return Object.fromEntries(
    weekDays.map((weekDay) => [weekDay?.toUpperCase(), value])
  );
};
