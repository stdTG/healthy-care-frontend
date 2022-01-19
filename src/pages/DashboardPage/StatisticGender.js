import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import Card from 'components/Card';
import palette from 'lib/colors/palette';
import { Typography, Icon } from 'components/ui';
import {
  SLegendTitle,
  SDoughnutWrap,
  SLegendSubTitle,
  SLegendTitleWrap,
} from './styled/StatisticGender';
import { useTranslation } from 'react-i18next';

function StatisticGender({ genderStatistic: data }) {
  const genders = data?.statistics?.byGender.items;
  const { t } = useTranslation();

  const calculatePercents = (items) => {
    const sumItemValues = items?.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    return items?.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.key]: Math.round((curr.value * 100) / sumItemValues),
      };
    }, {});
  };

  const calculatedPercents = useMemo(() => calculatePercents(genders), [data]);

  const { male, female, other } = calculatedPercents || {};

  const gendersPercent = {
    datasets: [
      {
        data: [male, female, other],
        backgroundColor: [palette.primary, palette.warning, palette.info],
      },
    ],
    labels: ['Male', 'Female', 'Other'],
  };

  const getNumberByGender = (genderName) => {
    return genders?.find((gender) => gender.key === genderName)?.value;
  };

  return (
    <Card
      customTitle={
        <Typography variant="h6" color="textSecondary">
          {t('PATIENTS BY SEX')}
        </Typography>
      }
    >
      <SDoughnutWrap>
        <Doughnut
          borderWidth={1}
          options={{ cutoutPercentage: 80, maintainAspectRatio: false }}
          data={gendersPercent}
          legend={false}
        />
        <div>
          <SLegendTitleWrap>
            <SLegendTitle color="#2164E8">
              <Icon icon="mars" mr={5} /> {t('Male')}
            </SLegendTitle>
            <SLegendSubTitle style={{ display: 'flex' }}>
              {male}%
              <Typography
                variant="h5"
                color="textSecondary"
                style={{ marginLeft: '5px' }}
              >
                {getNumberByGender('male')}
              </Typography>
            </SLegendSubTitle>
          </SLegendTitleWrap>

          <SLegendTitleWrap>
            <SLegendTitle color="#F23A61">
              <Icon icon="venus" mr={5} /> {t('Female')}
            </SLegendTitle>
            <SLegendSubTitle style={{ display: 'flex' }}>
              {female}%
              <Typography
                variant="h5"
                color="textSecondary"
                style={{ marginLeft: '5px' }}
              >
                {getNumberByGender('female')}
              </Typography>
            </SLegendSubTitle>
          </SLegendTitleWrap>

          <SLegendTitleWrap>
            <SLegendTitle color="#F29D3A">
              <Icon icon="mars-stroke-h" /> {t('Other')}
            </SLegendTitle>
            <SLegendSubTitle style={{ display: 'flex' }}>
              {100 - male - female}%
              <Typography
                variant="h5"
                color="textSecondary"
                style={{ marginLeft: '5px' }}
              >
                {getNumberByGender('other')}
              </Typography>
            </SLegendSubTitle>
          </SLegendTitleWrap>
        </div>
      </SDoughnutWrap>
    </Card>
  );
}

export default StatisticGender;
