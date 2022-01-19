import React from 'react';
import { format } from 'date-fns';
import { Box as MuiBox } from '@material-ui/core';

import {
  SActionsWrap,
  SDetailItem,
  SDetailItemInfo,
} from '../../styled/detailsDialog';
import { Button } from 'components';
import { Avatar, Icon as CustomIcon, Typography } from 'components/ui';
import { locationTypesData, meetingTypesData } from 'lib/enums/meetingTypes';
import { countAge, getDateFormat } from 'lib/utils';
import { SEX, sexData } from 'lib/enums/sex';
import DialogContent from '../../../../components/Dialogs/DialogContent/Index';
import { useTranslation } from 'react-i18next';

function GetAppointmentsDetails(props) {
  const { onEditAppointment, initialData } = props;
  const { t } = useTranslation();

  if (!initialData.startDate) {
    return null;
  }
  const patient = initialData?.patient;
  const careTeamMember = initialData?.user;
  const eventType = meetingTypesData[initialData?.eventType];
  const location = locationTypesData[initialData?.location];

  const Icon = ({ icon }) => <CustomIcon icon={icon} mr={8} mt={2} ml={4} />;

  return {
    title: t('Appointments details'),
    actions: (
      <SActionsWrap>
        <Button
          onClick={onEditAppointment}
          type="submit"
          title={t('Edit appointment')}
          icon="pen"
        />
      </SActionsWrap>
    ),
    content: (
      <DialogContent>
        <SDetailItem>
          <Icon icon="user" />
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <SDetailItemInfo>
              <Typography variant={'h5'}>
                {patient.firstName} {patient.lastName}
              </Typography>
              <Typography>
                <MuiBox display="flex" alignItems="baseline">
                  {patient && patient.sex !== SEX.undefined && (
                    <>
                      <Icon icon={sexData[patient.sex]?.icon} size="1x" />
                      <span style={{ margin: '0 5px' }}>&sdot;</span>
                    </>
                  )}

                  <Typography variant="h5">
                    {countAge(patient.birthDate)}
                  </Typography>
                </MuiBox>
              </Typography>
            </SDetailItemInfo>
            <Avatar />
          </div>
        </SDetailItem>

        <SDetailItem>
          <Icon icon="calendar-day" />
          <div>
            <Typography>
              {format(
                getDateFormat(initialData.startDate),
                'EEE. d MMM. yyyy '
              )}
            </Typography>
            <Typography>
              {format(getDateFormat(initialData.startDate), ' h:mm a') +
                ' - ' +
                format(getDateFormat(initialData.endDate), 'h:mm a')}
            </Typography>
          </div>
        </SDetailItem>

        <SDetailItem>
          <Icon icon="notes-medical" />
          <Typography variant={'h5'}>{eventType?.label}</Typography>
        </SDetailItem>

        {location?.label && (
          <SDetailItem>
            <Icon icon="map-marker" />
            <Typography variant={'h5'}>{location?.label}</Typography>
          </SDetailItem>
        )}

        <SDetailItem style={{ alignItems: 'center' }}>
          <Avatar
            size="small"
            style={{ marginRight: '5px', width: '20px', height: '20px' }}
          />
          <Typography variant={'h5'}>
            {careTeamMember.firstName} {careTeamMember.lastName}
          </Typography>
        </SDetailItem>

        <SDetailItem>
          <Icon icon="map-marker" />
          <Typography variant={'h5'}>
            {initialData?.isOnline ? t('Online') : t('Offline')}
          </Typography>
        </SDetailItem>

        {initialData?.note && (
          <SDetailItem>
            <Icon icon="sticky-note" />
            <Typography variant={'h5'}>{initialData?.note}</Typography>
          </SDetailItem>
        )}
      </DialogContent>
    ),
  };
}

export default GetAppointmentsDetails;
