import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().nullable().required(),
  startDate: Yup.string().required(),
  endDate: Yup.date().nullable(),
});
