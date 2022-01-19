export const SEX = {
  undefined: 'UNDEFINED',
  male: 'MALE',
  female: 'FEMALE',
  other: 'OTHER',
};

export const sexData = {
  [SEX.male]: {
    label: 'Male',
    value: SEX.male,
    icon: 'mars',
  },
  [SEX.female]: {
    label: 'Female',
    value: SEX.female,
    icon: 'venus',
  },
  [SEX.other]: {
    label: 'Other',
    value: SEX.other,
    icon: 'neuter',
  },
};

export const getSexDate = (sex) => {
  if (!sexData[sex]) {
    return {};
  }
  return sexData[sex];
};
