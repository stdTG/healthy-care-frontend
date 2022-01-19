import React, { useMemo } from 'react';
import { fade } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';

import { options } from './mock';
import Card from 'components/Card';
import palette from 'lib/colors/palette';
import { Typography } from 'components/ui';
import { useTranslation } from 'react-i18next';

function StatisticAge({ ageStatistic: data }) {
  const userAges = data?.statistics?.byAge.items;
  const { t } = useTranslation();

  const calculateData = useMemo(() => {
    const sumAges = userAges?.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    return userAges?.reduce(
      (acc, curr) => {
        return {
          labels: [...acc.labels, curr.key],
          amount: [...acc.amount, (curr.value * 100) / sumAges],
        };
      },
      { labels: [], amount: [] }
    );
  }, [userAges]);

  const { labels, amount } = calculateData || {};

  const patientByAgeData = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, fade(palette.primary, 0.4));
    gradient.addColorStop(1, fade(palette.primary, 0));

    return {
      // labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: '',
          borderColor: palette.primary,
          borderWidth: 1,
          pointRadius: 0,
          data: amount,
        },
      ],
    };
  };

  return (
    <Card
      customTitle={
        <Typography variant="h6" color="textSecondary">
          {t('PATIENTS BY AGE')}
        </Typography>
      }
    >
      <Line data={patientByAgeData} showLines={false} options={options} />
    </Card>
  );
}

export default StatisticAge;
