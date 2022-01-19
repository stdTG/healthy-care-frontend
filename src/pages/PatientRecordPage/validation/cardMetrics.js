import * as Yup from 'yup';

export const schema = Yup.object().shape({
  // metric: Yup.string().required(),
  // date: Yup.date().required(),
  value: Yup.string().nullable().required('This field is required!'),
});
