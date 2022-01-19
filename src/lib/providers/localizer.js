import React from 'react';
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, startOfWeek } from 'date-fns';

const locales = {
  'en-US': import('date-fns/locale/en-GB'),
};


export const localizer = dateFnsLocalizer({
  startOfWeek,
  getDay,
  format,
  locales,
});

export const LocalizeContext = React.createContext({ localizer: localizer });

export const LocalizerProvider = LocalizeContext.Provider;
