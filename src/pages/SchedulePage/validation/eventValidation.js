import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string().nullable().required('This field is required!'),
  users: Yup.string().nullable().required('This field is required!'),
  date: Yup.string().nullable().required('This field is required!'),
});
