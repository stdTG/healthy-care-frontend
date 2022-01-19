export const metricTypes = {
  weight: '1',
  height: '2',
  heartRate: '3',
  bmi: '4',
  cough: '5',
  temperature: '6',
};

export const metricTypesData = {
  [metricTypes.weight]: {
    label: 'Weight',
    value: metricTypes.weight,
    icon: 'mars',
    measure: 'kg',
  },
  [metricTypes.height]: {
    label: 'Height',
    value: metricTypes.height,
    icon: 'mars',
    measure: 'cm',
  },
  [metricTypes.heartRate]: {
    label: 'Heart rate',
    value: metricTypes.heartRate,
    icon: 'mars',
    measure: 'bpm',
  },
  [metricTypes.bmi]: {
    label: 'BMI',
    value: metricTypes.bmi,
    icon: 'mars',
  },
  [metricTypes.cough]: {
    label: 'Cough',
    value: metricTypes.cough,
    icon: 'mars',
  },
  [metricTypes.temperature]: {
    label: 'Temperature',
    value: metricTypes.temperature,
    icon: 'mars',
  },
};
