import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().nullable().required('This field is required'),
  subtitle: Yup.string().nullable(),
  description: Yup.string().nullable(),
  image: Yup.string().nullable(),

  durationMonths: Yup.number().min(0),
  durationWeeks: Yup.number().min(0).max(4),
  durationDays: Yup.number().min(0).max(31),
});
