import * as Yup from 'yup';

export const schema = Yup.object().shape({
  patient: Yup.string().nullable().required('This field is required!'),
  eventType: Yup.string().nullable().required('This field is required!'),
  date: Yup.string().nullable().required('This field is required!'),
});
