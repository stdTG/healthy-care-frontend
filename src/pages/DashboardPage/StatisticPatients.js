import React from 'react';

import colors from 'lib/colors';
import { Typography, Icon } from 'components/ui';
import Card from 'components/Card';
import {
  SIconWrap,
  SLegendTitle,
  SLegendSubTitle,
} from './styled/StatisticPatients';
import { useTranslation } from 'react-i18next';

function StatisticPatients(props) {
  const data = {
    patients: { total: 588, percent: 12, increased: true },
    carePlans: { active: 435, percent: 6, increased: false },
  };
  const { t } = useTranslation();

  return (
    <Card
      customTitle={
        <Typography variant="h6" color="textSecondary">
          {t('PATIENTS STATS')}
        </Typography>
      }
    >
      <SLegendTitle alignItems="baseline" mb={10}>
        <SIconWrap color="primary">
          <Icon icon="users" />
        </SIconWrap>
        <div>
          <Typography variant="h5">
            {data.patients.total} {t('total patients')}
          </Typography>
          <SLegendSubTitle
            color={data.patients.increased ? colors.green100 : colors.red100}
          >
            {data.patients.increased ? '+' : '-'}
            {data.patients.percent}% {t('from last month')}
          </SLegendSubTitle>
        </div>
      </SLegendTitle>

      <SLegendTitle alignItems="baseline" mb={10}>
        <SIconWrap color="warning">
          <Icon icon="hands-heart" />
        </SIconWrap>
        <div>
          <Typography variant="h5">
            {data.carePlans.active} {t('with active care plan')}
          </Typography>
          <SLegendSubTitle
            color={data.carePlans.increased ? colors.green100 : colors.red100}
          >
            {data.carePlans.increased ? '+' : '-'}
            {data.carePlans.percent}% {t('from last month')}
          </SLegendSubTitle>
        </div>
      </SLegendTitle>
    </Card>
  );
}

export default StatisticPatients;
