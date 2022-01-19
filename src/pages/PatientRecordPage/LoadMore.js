import SLoadMoreWrap from 'pages/PatientRecordPage/styled/SLoadMoreWrap';
import {
  CircularProgress,
  Typography as MuiTypography,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadMore = ({ loading, pageInfo, currentPage, onLoadMore }) => {
  const { t } = useTranslation();
  return (
    <>
      {!loading ? (
        pageInfo?.totalPages - 1 > currentPage && (
          <SLoadMoreWrap>
            <MuiTypography
              variant="h5"
              color="primary"
              style={{ textAlign: 'center' }}
              onClick={onLoadMore}
            >
              {t('Load more')}
            </MuiTypography>
          </SLoadMoreWrap>
        )
      ) : (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress size={25} />
        </div>
      )}
    </>
  );
};

export default LoadMore;
