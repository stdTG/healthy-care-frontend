import React, { useContext } from 'react';
import { values } from 'ramda';
import { Views } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardCards,
} from './styled/dashboardLayout';
import { getModuleState as getAuthModuleState } from 'services/auth';
import { LocalizeContext } from 'lib/providers/localizer';
import { getModuleState } from 'services/calendar';
import { Calendar } from 'components';
import { Search, Typography } from 'components/ui';
import StatisticAge from './StatisticAge';
import StatisticGender from './StatisticGender';
import StatisticPatients from './StatisticPatients';
import StatisticLocation from './StatisticLocation';
import getVisibleTimePeriod from 'pages/SchedulePage/utils/getVisibleTimePeriod';
import { Drawer } from './styled';
import LoadingPage from 'components/LoadingPage';
import { useAllStatisticsRequest, useRefreshWorkingHours } from './hooks';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  useRefreshWorkingHours();
  const { events, workingHours, eventDuration } = useSelector(getModuleState);
  const localizer = useContext(LocalizeContext);
  const authState = useSelector(getAuthModuleState);
  const { t } = useTranslation();

  const {
    loading,
    data: { genderStatistic, ageStatistic, locationStatistic },
  } = useAllStatisticsRequest();

  const filteredEvents = values(events)?.filter(
    (event) => event.user?.status !== 'CANCELLED'
  );

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <DashboardContainer>
          <section>
            <DashboardHeader>
              <Typography variant="h4" color="textSecondary">
                {/* {`${t('Welcome')}, ${authState.username}`} */}
                {`${t('Welcome')}, Dr. Anne Adler`}
              </Typography>
            </DashboardHeader>

            <Search
              placeholder={`${t('Search patient')}...`}
              style={{ margin: '24px auto' }}
            />

            <DashboardCards>
              <StatisticGender genderStatistic={genderStatistic} />
              <StatisticAge ageStatistic={ageStatistic} />
              <StatisticPatients />
              <StatisticLocation locationStatistic={locationStatistic} />
            </DashboardCards>
          </section>

          <Drawer>
            <Typography variant="h2" mb={2}>
              {t('Today')}
            </Typography>
            {filteredEvents.length === 0 ? (
              <Typography variant="h3" mb={8} color="textSecondary">
                {t('No appointment')}
              </Typography>
            ) : (
              <Typography variant="h3" mb={8}>
                {filteredEvents.length} {t('appointments')}
              </Typography>
            )}
            <Calendar
              step={30}
              timeslots={eventDuration > 30 ? 1 : 2}
              events={filteredEvents}
              views={Views.DAY}
              defaultView="day"
              style={{ height: '85vh' }}
              localizer={localizer}
              toolbar={false}
              workHours={workingHours}
              getVisibleTimePeriod={getVisibleTimePeriod}
            />
          </Drawer>
        </DashboardContainer>
      )}
    </div>
  );
}
