import React, { useMemo } from 'react';

import Card from 'components/Card';
import { Grid as MuiGrid } from '@material-ui/core';
import { Typography } from 'components/ui';
import { useTranslation } from 'react-i18next';

function StatisticLocation({ locationStatistic: data }) {
  const locations = data?.statistics?.byLocation.items || [];
  const { t } = useTranslation();

  const calculatePercents = (items) => {
    const sumItemValues = items?.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    return items?.reduce((acc, curr) => {
      return [
        ...acc,
        {
          name: curr.key,
          amount: curr.value,
          percent: (curr.value * 100) / sumItemValues,
        },
      ];
    }, []);
  };

  var calculatedPercents = useMemo(() => calculatePercents(locations), [data]);

  return (
    <Card
      customTitle={
        <Typography variant="h6" color="textSecondary">
          {t('PATIENTS BY LOCATION')}
        </Typography>
      }
    >
      {calculatedPercents.map(({ name, amount, percent }) => {
        return (
          <MuiGrid
            container
            direction="row"
            justify="space-between"
            style={{
              marginBottom: '10px',
            }}
          >
            <MuiGrid item>
              {/* <Typography variant="h5">{name}</Typography> */}
              <Typography variant="h5">{'New York City'}</Typography>
            </MuiGrid>

            <MuiGrid container direction="row" justify="space-between">
              <MuiGrid item xs={3}>
                <Typography variant="h5" color="textSecondary">
                  {amount}
                </Typography>
              </MuiGrid>

              <MuiGrid item>
                <Typography variant="h5">{percent.toFixed(1)}%</Typography>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        );
      })}
    </Card>
  );
}

export default StatisticLocation;
