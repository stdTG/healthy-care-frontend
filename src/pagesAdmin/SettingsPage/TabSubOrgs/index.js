import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Button as MuiButton,
  CircularProgress,
  Grid as MuiGrid,
} from '@material-ui/core';

import useDialog from 'lib/hooks/useDialog';
import { Icon, Search, Space } from 'components/ui';
import SubOrgDialog from './SubOrgDialog';
import SLoader from '../styled/SLoader';
import OrgCard from './OrgCard';
import LoadingPage from '../../../components/LoadingPage/index';
import Typography from '@material-ui/core/Typography';
import { useDebounce } from 'use-debounce';
import useLoadSubOrgs from './hooks/useLoadSubOrgs';
import useAddSubOrg from './hooks/useAddSubOrg';
import useEditSubOrg from './hooks/useEditSubOrg';
import useDeleteSubOrg from './hooks/useDeleteSubOrg';
import { useTranslation } from 'react-i18next';

const TabSubOrganizations = () => {
  const subOrgDialog = useDialog();

  const [isEditMode, setIsEditMode] = useState(false);

  const [search, setSearch] = useState('');
  const [searchWithDelay] = useDebounce(search, 200);
  const { t } = useTranslation();

  const {
    subOrgs,
    setSubOrgs,
    loadingSubOrgs,
    pageInfo,
    fetchData,
    callCount,
  } = useLoadSubOrgs(searchWithDelay);

  const { onAddSubOrg, loadingCreateSubOrg } = useAddSubOrg(
    subOrgDialog,
    subOrgs,
    setSubOrgs
  );

  const { onEditSubOrg, loadingUpdate } = useEditSubOrg(
    subOrgs,
    setSubOrgs,
    setIsEditMode,
    subOrgDialog
  );

  const { onDeleteSubOrg, loadingDelete } = useDeleteSubOrg(
    subOrgs,
    setSubOrgs
  );

  return (
    <div>
      <Space display="flex" mb={2} flex="auto">
        <Search
          placeholder={t('Search sub organisations')}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
        <MuiButton size="medium" variant="contained" onClick={onAddSubOrg}>
          <Icon icon="folders" style={{ fontSize: '20px' }} mr={10} />
          {t('Add sub organisation')}
        </MuiButton>
      </Space>

      {loadingSubOrgs ||
      loadingCreateSubOrg ||
      loadingUpdate ||
      loadingDelete ? (
        <LoadingPage />
      ) : (
        <>
          <InfiniteScroll
            dataLength={subOrgs?.length || 0}
            next={fetchData}
            hasMore={pageInfo.page < pageInfo.totalPages - 1}
            loader={
              <SLoader>
                <CircularProgress size={25} />
              </SLoader>
            }
            style={{
              overflowY: 'hidden',
              overflowX: 'hidden',
            }}
          >
            {subOrgs?.length === 0 && callCount > 0 ? (
              <Typography align={'center'} variant="h5">
                {t('Sorry, nothing found.')}
              </Typography>
            ) : (
              <MuiGrid container spacing={2}>
                {subOrgs?.map((item) => {
                  return (
                    <MuiGrid
                      item
                      xs={12}
                      md={4}
                      lg={3}
                      key={item.id_}
                      style={{
                        width: '300px',
                      }}
                    >
                      <OrgCard
                        id={item.id_}
                        fullName={item.name}
                        data={item}
                        openEditModal={() => onEditSubOrg(item)}
                        onDelete={onDeleteSubOrg}
                      />
                    </MuiGrid>
                  );
                })}
              </MuiGrid>
            )}
          </InfiniteScroll>
        </>
      )}

      <SubOrgDialog
        isOpen={subOrgDialog.isOpen}
        close={subOrgDialog.close}
        initialData={subOrgDialog.initialData}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
    </div>
  );
};

export default TabSubOrganizations;
