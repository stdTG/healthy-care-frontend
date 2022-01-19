import React, { useState } from 'react';
import {
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const getDuration = () => {
  return Array(8)
    .fill(15)
    .map((i, index) => i * (index + 1));
};

function DialogTitle(props) {
  const [selectedDuration, setSelectedDuration] = useState(30);
  const { t } = useTranslation();

  return (
    <MuiSelect
      variant="outlined"
      size="small"
      name="duration"
      style={{ height: '32px' }}
      value={selectedDuration}
    >
      {getDuration().map((item, index) => (
        <MuiMenuItem
          key={index}
          value={item}
          onClick={() => setSelectedDuration(item)}
        >
          {t('Appointment duration')}: {item} min
        </MuiMenuItem>
      ))}
    </MuiSelect>
  );
}

export default DialogTitle;
