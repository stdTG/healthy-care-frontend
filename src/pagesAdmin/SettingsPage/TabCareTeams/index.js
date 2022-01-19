import React, { useState } from 'react';
import {
  Button as MuiButton,
  CircularProgress,
  Grid as MuiGrid,
} from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Icon, Search, Space } from 'components/ui';
import useDialog from 'lib/hooks/useDialog';

import CareTeamDialog from './CareTeamDialog';
import CardCareTeam from './Card/index';
import SLoader from '../styled/SLoader';
import LoadingPage from '../../../components/LoadingPage/index';
import Typography from '@material-ui/core/Typography';
import { useDebounce } from 'use-debounce';
import useLoadCareTeams from './hooks/useLoadCareTeams';
import useDeleteCareTeam from './hooks/useDeleteCareTeam';
import useCreateCareTeam from './hooks/useCreateCareTeam';
import useUpdateCareTeam from './hooks/useUpdateCareTeam';
import { useTranslation } from 'react-i18next';

function TabCareTeams(props) {
  const careTeamDialog = useDialog();

  const [isEditMode, setIsEditMode] = useState(false);

  const [search, setSearch] = useState('');
  const [searchWithDelay] = useDebounce(search, 200);
  const { t } = useTranslation();

  const {
    careTeams,
    setCareTeams,
    loadingCareTeams,
    pageInfo,
    fetchData,
    callCount,
  } = useLoadCareTeams(searchWithDelay);

  const { onAddCareTeam, loadingCreate } = useCreateCareTeam(
    careTeamDialog,
    careTeams,
    setCareTeams
  );

  const { onDeleteCareTeam, loadingDelete } = useDeleteCareTeam(
    careTeams,
    setCareTeams
  );

  const { onEditCareTeam, loadingUpdate } = useUpdateCareTeam(
    careTeamDialog,
    setIsEditMode,
    careTeams,
    setCareTeams
  );

  return (
    <>
      <Space display="flex" mb={2} flex="auto">
        <Search
          placeholder={t('Search care teams')}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
        <MuiButton size="medium" variant="contained" onClick={onAddCareTeam}>
          <Icon icon="users" style={{ fontSize: '20px' }} mr={10} />
          {t('Add care team')}
        </MuiButton>
      </Space>

      {loadingCareTeams || loadingCreate || loadingUpdate || loadingDelete ? (
        <LoadingPage />
      ) : (
        <div>
          <InfiniteScroll
            dataLength={careTeams?.length || 0}
            next={fetchData}
            hasMore={pageInfo?.hasNextPage}
            loader={
              <SLoader>
                <CircularProgress size={25} />
              </SLoader>
            }
            style={{
              overflowY: 'hidden',
              overflowX: 'hidden',
              boxShadow: 'none',
            }}
          >
            {careTeams?.length === 0 && callCount > 0 ? (
              <Typography align={'center'} variant="h5">
                {t('Sorry, nothing found.')}
              </Typography>
            ) : (
              <MuiGrid container spacing={2}>
                {careTeams?.map((item) => {
                  return (
                    <MuiGrid
                      item
                      xs={12}
                      md={4}
                      lg={3}
                      key={item?.id_}
                      style={{
                        width: '300px',
                      }}
                    >
                      <CardCareTeam
                        data={item}
                        openEditModal={() => onEditCareTeam(item)}
                        onDelete={onDeleteCareTeam}
                      />
                    </MuiGrid>
                  );
                })}
              </MuiGrid>
            )}
          </InfiniteScroll>
        </div>
      )}

      <CareTeamDialog
        isOpen={careTeamDialog.isOpen}
        close={careTeamDialog.close}
        initialData={careTeamDialog.initialData}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
    </>
  );
}

export default TabCareTeams;
