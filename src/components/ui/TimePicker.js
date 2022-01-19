import * as React from 'react';
import DatePickerAntd from 'components/ui/DatePickerAntd';

const TimePicker = React.forwardRef((props, ref) => {
  return <DatePickerAntd {...props} picker="time" mode={undefined} ref={ref} />;
});

TimePicker.displayName = 'TimePicker';

export default TimePicker;