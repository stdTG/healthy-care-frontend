import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Section = (info, index) => {
  const { t } = useTranslation();

  return (
    <MuiBox key={index}>
      <MuiTypography variant="subtitle2">{info.title}</MuiTypography>
      <MuiTypography variant="h5">
        {info.data || (
          <MuiTypography
            variant="subtitle2"
            color="textSecondary"
            style={{ fontWeight: '400' }}
          >
            {t('Empty')}
          </MuiTypography>
        )}
      </MuiTypography>
    </MuiBox>
  );
};

export default Section;
