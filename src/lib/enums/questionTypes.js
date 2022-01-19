export const questionTypes = {
  numeric: '1',
  scale: '2',
  rating: '3',
  yesNo: '4',
  multipleChoice: '5',
};

export const questionTypesData = {
  [questionTypes.numeric]: {
    type: questionTypes.numeric,
    text: 'Numeric',
  },
  [questionTypes.scale]: {
    type: questionTypes.scale,
    text: 'Scale',
  },
  [questionTypes.rating]: {
    type: questionTypes.rating,
    text: 'Rating',
  },
  [questionTypes.yesNo]: {
    type: questionTypes.yesNo,
    text: 'Yes/No',
  },
  [questionTypes.multipleChoice]: {
    type: questionTypes.multipleChoice,
    text: 'Multiple choice',
  },
};
