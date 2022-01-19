import weekDays from 'lib/enums/weekDays';

function getWeekSchedule (value) {
  return Object.fromEntries(
    weekDays.map(weekDay => [
      weekDay,
      value,
    ])
  )
}

export default getWeekSchedule