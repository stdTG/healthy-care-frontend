import React from 'react';
import { useSelector } from 'react-redux';

import { selectors as calendarSelectors } from 'services/calendar';
import Card from 'pages/SchedulePage/EventCard';
import { Drawer } from 'components/ui';
import { useTranslation } from 'react-i18next';

function EventCards() {
  const { t } = useTranslation();

  const statuses = [
    {
      key: 'upcoming',
      title: t('Upcoming'),
      description: t('These are the appointments that patients have accepted'),
      events: useSelector(calendarSelectors.getUpcoming),
    },
    {
      key: 'requested',
      title: t('Requests from patients'),
      description: t(
        'These are the appointments that patients have requested. You can accept them or reschedule'
      ),
      events: useSelector(calendarSelectors.getRequested),
    },
    {
      key: 'pending',
      title: t('Your pending requests'),
      description: t(
        "These are the appointments you have requested, that patients didn't confirm yet"
      ),
      events: useSelector(calendarSelectors.getPending),
    },
    {
      key: 'cancelled',
      title: t('Cancelled appointments'),
      description: t(
        'These are the appointments that have been cancelled y the patients'
      ),
      isClosed: true,
      events: useSelector(calendarSelectors.getCanceled),
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      backgroundColor="transparent"
      left="92px"
      border="none"
    >
      {statuses.map((item, index) => {
        return (
          <Card
            data={item}
            key={item.key}
            isCancelled={item.key === 'cancelled'}
          />
        );
      })}
    </Drawer>
  );
}

export default EventCards;
