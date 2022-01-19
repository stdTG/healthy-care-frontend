import * as yup from 'yup';
import { generateAvailabilitiesFormValue } from '../../../lib/utils/generateAvailabilitiesFormValue';

export const validationSchema = yup.object().shape(
  generateAvailabilitiesFormValue(
    yup.object().shape({
      startTime: yup.date().nullable().typeError('Invalid Time Format'),
      endTime: yup
        .date()
        .nullable()
        .min(
          yup.ref('startTime'),
          'the end time cannot be earlier than the start time'
        )
        .typeError('Invalid Time Format'),
      startLunchTime: yup
        .date()
        .nullable()
        .min(yup.ref('startTime'), 'Error')
        .max(yup.ref('endTime'), 'Error')
        .typeError('Invalid Time Format'),
      endLunchTime: yup
        .date()
        .nullable()
        .min(yup.ref('startLunchTime'), 'Error')
        .max(yup.ref('endTime'), 'Error')
        .typeError('Invalid Time Format'),
    })
  )
);
