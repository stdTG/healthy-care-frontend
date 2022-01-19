import shortid from 'shortid';
//TODO remove file

export const mockFiles = [
  {
    title: 'X-rays left knee',
    id: shortid.generate(),
    fileName: '5d07a460d3806c07fc513d3e.jpg',
    url: {
      relative: '',
      absolute:
        'https://i.pinimg.com/236x/e9/b5/17/e9b5174f026c7fc63c96a2127c187cb3--school-of-visual-arts-experimental-photography.jpg',
    },
    type: 1,
    thumbnailUrl: null,
    lastUpdated: new Date(),
    size: '8',
  },
];

export const mockMedicalConditions = [
  {
    id: 'shortidawef',
    name: 'Diabetis',
    startDate: new Date(2020, 5, 5),
    isRecovered: false,
  },
  {
    id: 'awef',
    name: 'Covid-19',
    startDate: new Date(2020, 3, 19),
    isRecovered: true,
  },
];
export const mockAllergies = [
  {
    id: shortid.generate(),
    name: 'Bee stings',
    startDate: new Date(2020, 5, 5),
  },
  {
    id: shortid.generate(),
    name: 'Pollen',
    startDate: new Date(2020, 3, 19),
  },
];

export const mockMetricsNew = [
  {
    code: '1',
    lastValue: {
      id: shortid.generate(),
      date: new Date(2020, 6, 5),
      value: 70,
    },
    amount: 3,
  },
  {
    code: '2',
    lastValue: {
      id: shortid.generate(),
      date: new Date(2020, 5, 5),
      value: 165,
    },
    amount: 3,
  },
  {
    code: '3',
    lastValue: {
      id: shortid.generate(),
      date: new Date(2020, 3, 29),
      value: 98,
    },
    amount: 5,
  },
  {
    code: '4',
    lastValue: {
      id: shortid.generate(),
      date: new Date(2020, 1, 29),
      value: 26.4,
    },
    amount: 2,
  },
];

export const mockMetrics = {
  '1': [
    {
      id: shortid.generate(),
      code: '1',
      date: new Date(2020, 6, 5),
      value: 70,
    },
    {
      id: shortid.generate(),
      name: '1',
      date: new Date(2020, 5, 5),
      value: 75,
    },
  ],
  '2': [
    {
      id: shortid.generate(),
      code: '2',
      date: new Date(2020, 5, 5),
      value: 165,
    },
    {
      id: shortid.generate(),
      code: '2',
      date: new Date(2000, 4, 8),
      value: 124,
    },
  ],
  '3': [
    {
      id: shortid.generate(),
      code: '3',
      date: new Date(2020, 3, 29),
      value: 98,
    },
    {
      id: shortid.generate(),
      code: '3',
      date: new Date(2000, 9, 6),
      value: 100,
      measure: 'bpm',
    },
  ],
  '4': [
    {
      id: shortid.generate(),
      code: '4',
      date: new Date(2020, 1, 29),
      value: 26.4,
      measure: null,
    },
    {
      id: shortid.generate(),
      code: '4',
      date: new Date(2000, 9, 6),
      value: 30,
      measure: null,
    },
  ],
};
