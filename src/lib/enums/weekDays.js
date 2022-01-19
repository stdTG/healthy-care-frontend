const weekDays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export default weekDays;

export const workingHoursTemplate = {
  dayOfWeek: '',
  startTime: null,
  endTime: null,

  startLunchTime: null,
  endLunchTime: null,
};

export const weekDaysEnum = {
  MONDAY: { key: 'MONDAY', value: 1, name: 'Monday', shortName: 'Mon' },
  TUESDAY: { key: 'TUESDAY', value: 2, name: 'Tuesday', shortName: 'Tue' },
  WEDNESDAY: {
    key: 'WEDNESDAY',
    value: 3,
    name: 'Wednesday',
    shortName: 'Wed',
  },
  THURSDAY: { key: 'THURSDAY', value: 4, name: 'Thursday', shortName: 'Thu' },
  FRIDAY: { key: 'FRIDAY', value: 5, name: 'Friday', shortName: 'Fri' },
  SATURDAY: { key: 'SATURDAY', value: 6, name: 'Saturday', shortName: 'Sat' },
  SUNDAY: { key: 'SUNDAY', value: 7, name: 'Sunday', shortName: 'Sun' },
};
