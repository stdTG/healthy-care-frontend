import * as Yup from 'yup';

export const schema = Yup.object().shape({
  value: Yup.string().required(),
  date: Yup.date().required(),
});
