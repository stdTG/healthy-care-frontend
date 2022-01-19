import Card from 'pagesAdmin/SettingsPage/Card';
import { Icon, IconButton } from 'components/ui';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import styled from 'styled-components';
import useDialog from 'lib/hooks/useDialog';
import DeleteDialog from 'pagesSuperAdmin/SettingsPage/DeleteDialog';
import useFetch from 'use-http';
import { useTranslation } from 'react-i18next';

const CardWithoutEditMode = (props) => {
  const {
    organizationName,
    adminEmail,
    adminPhoneNumber,
    region,
    userPoolId,
    dashboardClientId,
    mobileClientId,
  } = props;
  const { t } = useTranslation();

  return (
    <>
      <SCardColumn>
        <Typography variant="h6" color="textSecondary">
          {t('Organization name')}
        </Typography>
        <Typography variant="h5">{organizationName}</Typography>
      </SCardColumn>

      <SCardColumn>
        <Typography variant="h6" color="textSecondary">
          {t('User pool id')}
        </Typography>
        <Typography variant="h5">{userPoolId}</Typography>
      </SCardColumn>

      <SCardColumn>
        <Typography variant="h6" color="textSecondary">
          {t('Dashboard client id')}
        </Typography>
        <Typography variant="h5">{dashboardClientId}</Typography>
      </SCardColumn>

      <SCardColumn>
        <Typography variant="h6" color="textSecondary">
          {t('Mobile client id')}
        </Typography>
        <Typography variant="h5">{mobileClientId}</Typography>
      </SCardColumn>

      <SCardColumn>
        <Typography variant="h6" color="textSecondary">
          {t('Admin email')}
        </Typography>
        <Typography variant="h5">{adminEmail}</Typography>
      </SCardColumn>

      <SCardColumn>
        <Typography variant="h6" color="textSecondary">
          {t('Admin phone number')}
        </Typography>
        <Typography variant="h5">{adminPhoneNumber}</Typography>
      </SCardColumn>

      <SCardColumn>
        <Typography variant="h6" color="textSecondary">
          {t('AWS Region')}
        </Typography>
        <Typography variant="h5">{region}</Typography>
      </SCardColumn>
    </>
  );
};

const CardWorkspace = (props) => {
  const {
    id,
    workspaceName,
    organizationName,
    adminEmail,
    adminPhoneNumber,
    region,
    userPoolId,
    availabilityHours,
    dashboardClientId,
    mobileClientId,
    onClick,
    workspaces,
    setWorkspaces,
  } = props;

  const deleteDialog = useDialog();

  const { delete: deleteWs } = useFetch({ data: [] });

  const [deleteLoading, setDeleteLoading] = useState({
    shortName: '',
  });

  const deleteWorkspace = async (shortName) => {
    setDeleteLoading({
      shortName,
    });

    await deleteWs(`/superadmin/workspaces/${shortName}`);

    setDeleteLoading({
      shortName,
    });

    setWorkspaces(
      workspaces.filter((workspace) => workspace.shortName !== shortName)
    );

    deleteDialog.close();
  };

  return (
    <>
      <Card
        title={workspaceName}
        onClick={onClick}
        getTitleIcon={() => <Icon icon="heartbeat" mr={10} />}
        EditButton={
          <IconButton
            icon={'trash'}
            onClick={() => deleteDialog.open()}
            color={'warning'}
          />
        }
      >
        {CardWithoutEditMode({
          id,
          workspaceName,
          organizationName,
          adminEmail,
          adminPhoneNumber,
          region,
          userPoolId,
          availabilityHours,
          dashboardClientId,
          mobileClientId,
        })}
      </Card>

      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        close={deleteDialog.close}
        initialData={deleteDialog.initialData}
        onDelete={() => deleteWorkspace(workspaceName)}
        loading={deleteLoading}
        shortName={workspaceName}
      />
    </>
  );
};

export default CardWorkspace;

const SCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.mb || 10}px;
  margin-top: ${(props) => props.mt}px;
`;
