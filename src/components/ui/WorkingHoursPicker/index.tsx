import React, { FC } from 'react';
import STimePicker from './styled/STimePicker';
import { Icon } from 'components/ui';

const WorkHoursPicker: FC<Props> = ({ time, isLunchTime, icon, onChange, error }) => {
  return (
    <div>
      <STimePicker
        // disabledHours={isLunchTime && disabledHours}
        // defaultValue={time && parseISO('2020-11-30T' + time)}
        value={time}
        onChange={onChange}
        onSelect={onChange}
        isError={!!error}
        suffixIcon={icon && <Icon icon={icon} mr={10} />}
      />
    </div>
  );
};

export default WorkHoursPicker;

interface Props {
  time: Date
  isLunchTime?: boolean
  onChange: (e: any) => void
  error: any
  icon?: string
}
