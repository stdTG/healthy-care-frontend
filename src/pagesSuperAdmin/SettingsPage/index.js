import React, { useEffect, useState } from 'react';
import { Icon, Search, Space } from 'components/ui';
import { Button as MuiButton, Grid as MuiGrid } from '@material-ui/core';
import CardWorkspace from 'pagesSuperAdmin/SettingsPage/CardWorkspace';
import useDialog from 'lib/hooks/useDialog';
import CreateWorkspaceDialog from 'pagesSuperAdmin/SettingsPage/CreateWorkspaceDialog';
import EmptyPage from 'pagesSuperAdmin/EmtyPage';
import useFetch from 'use-http';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const createWorkspaceDialog = useDialog();

  const [workspaces, setWorkspaces] = useState([]);

  const [isWorkspaceCreated, setIsWorkspaceCreated] = useState(false);
  const { t } = useTranslation();

  const { get, response } = useFetch({
    data: [],
    cachePolicy: 'no-cache',
  });

  useEffect(() => {
    (async () => {
      await get('/superadmin/workspaces');

      setWorkspaces(response.data);
    })();
  }, [isWorkspaceCreated]);

  return (
    <>
      {workspaces.length >= 0 ? (
        <div>
          <Space display="flex" mb={2} flex="auto">
            <Search placeholder={t('Search workspace')} />
            <MuiButton
              size="medium"
              variant="contained"
              onClick={() => createWorkspaceDialog.open()}
            >
              <Icon icon="folders" style={{ fontSize: '20px' }} mr={10} />
              {t('Add workspace')}
            </MuiButton>
          </Space>

          <>
            <MuiGrid container spacing={2}>
              {workspaces?.map(
                ({ id, shortName, fullName, admin, cognito }) => {
                  return (
                    <MuiGrid
                      item
                      xs={12}
                      md={4}
                      lg={3}
                      key={id}
                      style={{
                        width: '300px',
                      }}
                    >
                      <CardWorkspace
                        id={id}
                        workspaceName={shortName}
                        organizationName={fullName}
                        adminEmail={admin?.email}
                        adminPhoneNumber={admin?.phone}
                        region={cognito.awsRegion}
                        userPoolId={cognito.userPoolId}
                        availabilityHours={cognito.availabilityHours}
                        dashboardClientId={cognito.dashboardClientId}
                        mobileClientId={cognito.mobileClientId}
                        workspaces={workspaces}
                        setWorkspaces={setWorkspaces}
                      />
                    </MuiGrid>
                  );
                }
              )}
            </MuiGrid>
          </>
        </div>
      ) : (
        <EmptyPage createWorkspaceDialog={() => createWorkspaceDialog.open()} />
      )}

      <CreateWorkspaceDialog
        isOpen={createWorkspaceDialog.isOpen}
        close={createWorkspaceDialog.close}
        initialData={createWorkspaceDialog.initialData}
        onWorkspaceCreated={setIsWorkspaceCreated}
      />
    </>
  );
};

export default SettingsPage;
