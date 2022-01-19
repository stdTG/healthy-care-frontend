import React, { memo, useEffect, useState } from 'react';

import Card from './Card';
import { Icon } from 'components/ui';
import {
  Box as MuiBox,
  CircularProgress,
  Typography as MuiTypography,
} from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';
import { GET_APPOINTMENTS } from 'pages/PatientRecordPage/gqlSchemes/getAppointments';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SeeButton from 'components/Buttons/SeeButton';
import { format, parseISO, formatISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { meetingTypes } from 'lib/enums/meetingTypes';

const CardAppointments = memo(function CardAppointments(props) {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({});
  const [appointments, setAppointments] = useState([]);
  const { t } = useTranslation();
  const [getAppointments, { data, loading, error }] = useLazyQuery(
    GET_APPOINTMENTS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        page: currentPage,
        perPage: 1,
        filter: {
          patient: id,
        },
      },
    }
  );
  useEffect(() => {
    getAppointments();
  }, []);

  useEffect(() => {
    setAppointments([
      ...appointments,
      ...(data?.schedule.eventPagination.items || []),
    ]);
    // setPageInfo({ totalPages: 3, totalItems: 3 });
    setPageInfo(data?.schedule.eventPagination.pageInfo);
  }, [data]);

  const loadMore = () => {
    getAppointments({
      variables: {
        page: currentPage + 1,
        perPage: 1,
        filter: {
          patient: id,
        },
      },
    });
    setCurrentPage(currentPage + 1);
  };

  const getTitleIcon = (props) => <Icon icon="calendar-day" {...props} />;

  return (
    <Card title={t('Appointments')} getTitleIcon={getTitleIcon}>
      {appointments.length === 0 ? (
        <MuiTypography variant="h5" color="textSecondary">
          {t('No appointment')}
        </MuiTypography>
      ) : (
        <div>
          {appointments?.map((event) => {
            return (
              <MuiBox
                justifyContent="space-between"
                display="flex"
                key={event.id_}
                my={3}
              >
                <MuiBox>
                  <SEventTitle variant="h5" color="textPrimary">
                    {format(parseISO(event.startDate), 'E. dd MMMM ∙ p')}
                  </SEventTitle>
                  <MuiTypography>{event.note}</MuiTypography>
                  <MuiBox
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    color="gray"
                    my={1}
                  >
                    <MuiTypography variant="h5" color="textSecondary">
                      <Icon icon="user-md" mr={5} />
                      {event.createdBy.speciality}
                    </MuiTypography>
                    <MuiTypography variant="h5" color="textSecondary">
                      {event.createdBy.firstName} {event.createdBy.lastName}
                    </MuiTypography>
                  </MuiBox>
                  <MuiTypography variant="h5" color="textSecondary">
                    <Icon icon="map-marker" mr={5} />
                    {event?.location?.name || t('Online')}
                  </MuiTypography>
                  <MuiBox display="flex" justifyContent="flex-start" mt={1}>
                    <SeeButton
                      onClick={console.log}
                      // disabled={loading || invalid}
                      title={t('See appointment')}
                      type="submit"
                    />
                  </MuiBox>
                </MuiBox>
              </MuiBox>
            );
          })}
        </div>
      )}

      {!loading ? (
        pageInfo?.totalPages - 1 > currentPage && (
          <MuiBox
            display="flex"
            justifyContent="center"
            paddingHorizontal="30px"
          >
            <SShowButton onClick={loadMore}>
              <MuiTypography variant="h5" color="textPrimary">
                {t('Show previous appointment')}
              </MuiTypography>
              <Icon icon="chevron-down" ml={8} />
            </SShowButton>
          </MuiBox>
        )
      ) : (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress size={25} />
        </div>
      )}
    </Card>
  );
});

export default CardAppointments;

const SShowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border: 1px solid #eeeeee;
  padding: 8px 16px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const SEventTitle = styled(MuiTypography)`
  margin-bottom: 5px;
`;
