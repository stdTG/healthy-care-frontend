import React from 'react';
import { CircularProgress as MuiCircularProgress } from '@material-ui/core';

import {
  SCardRow,
  SEmptyHint,
  SEmptyLine,
  SIcon,
} from 'pagesAdmin/SettingsPage/styled/tabSubOrganisation';
import { Typography } from 'components/ui';
import SButton from 'pagesAdmin/SettingsPage/styled/SButton';
import useWorkingHours from 'pagesAdmin/SettingsPage/TabSubOrgs/hooks/useWorkingHours';
import useDialog from 'lib/hooks/useDialog';
import { countries } from 'countries-list';
import styled from 'styled-components';
import WorkHoursDialog from '../../../../components/ui/WorkHoursDialog/index';
import { useTranslation } from 'react-i18next';

function ReadCard(props) {
  const { id, data, viewUsers } = props;

  const {
    careTeams,
    email,
    phone,
    site,
    supervisors,
    users,
    fullAddress,
  } = data;

  const workHoursDialog = useDialog();

  const { saveWorkingHours, getWorkingHours, loading } = useWorkingHours();
  const { t } = useTranslation();

  async function openWorkHoursDialog() {
    const workingHours = await getWorkingHours(id);

    const formatWorkingHours = Object.values(workingHours)?.map((item) => {
      return {
        dayOfWeek: item.dayOfWeek,
        startTime: new Date('2020-11-30T' + item.startTime),
        endTime: new Date('2020-11-30T' + item.endTime),
        startLunchTime: new Date('2020-11-30T' + item.startLunchTime),
        endLunchTime: new Date('2020-11-30T' + item.endLunchTime),
      };
    });

    const result = await workHoursDialog.open({
      id,
      workingHours: formatWorkingHours,
    });

    if (!result || !result.workingHours) return;

    saveWorkingHours({ ...result, subOrgId: id });
  }

  const addressSection = fullAddress?.address ? (
    <span>
      {fullAddress.address} {fullAddress.city} {fullAddress.zipcode},{' '}
      {countries[fullAddress.country] && countries[fullAddress.country].name}
    </span>
  ) : null;

  return (
    <>
      <SCardRow>
        <SIcon icon="envelope" />
        {email || <SEmptyLine />}
      </SCardRow>

      <SCardRow>
        <SIcon icon="mobile" />
        {phone || <SEmptyLine />}
      </SCardRow>

      <SCardRow>
        <SIcon icon="link" />
        {site || <SEmptyLine />}
      </SCardRow>

      <SCardRow mb={20}>
        <SIcon icon="map" />
        {addressSection || <SEmptyLine />}
      </SCardRow>

      <SCardRow mb={20}>
        {loading ? (
          <MuiCircularProgress size={15} style={{ marginRight: '13px' }} />
        ) : (
          <SIcon icon="clock" />
        )}

        <Typography
          color="primary"
          onClick={openWorkHoursDialog}
          style={{ cursor: 'pointer', display: 'inline-block' }}
        >
          {t('Set availability hours')}
        </Typography>
      </SCardRow>

      <Typography color="textSecondary">
        {t('Management information')}
      </Typography>

      <SCardRow mt={10}>
        <SIcon icon="users" color="warning" />

        {careTeams && careTeams.length === 1 ? (
          `${careTeams.length} team`
        ) : !careTeams || !careTeams.length || careTeams.length === 0 ? (
          <SEmptyHint>{t('No team')}</SEmptyHint>
        ) : (
          `${careTeams.length} teams`
        )}
      </SCardRow>

      <SCardRow mt={10}>
        <SIcon icon="user" color="primary" />
        {users && users?.length !== 0 ? (
          users?.length + ' total users'
        ) : (
          <SEmptyHint>{t('No user')}</SEmptyHint>
        )}
      </SCardRow>

      <SCardRow mt={10} mb={40} fw={'normal'}>
        <div>
          <SIcon icon="crown" color="info" />
          <b>{supervisors?.length}</b> {t('users have supervisor role')}
        </div>
      </SCardRow>

      <SButtonWrap>
        <SButton title="View users" onClick={viewUsers} />
      </SButtonWrap>

      {workHoursDialog.isOpen && (
        <WorkHoursDialog
          isOpen={workHoursDialog.isOpen}
          close={workHoursDialog.close}
          initialData={workHoursDialog.initialData}
        />
      )}
    </>
  );
}

export default ReadCard;

const SButtonWrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  padding-right: 25px;
  padding-top: 20px;
  padding-bottom: 25px;
`;
