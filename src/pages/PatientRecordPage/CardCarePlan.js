import React, { memo, useState } from 'react';
import { format } from 'date-fns';
import {
  LinearProgress as BorderLinearProgress,
  Typography as MuiTypography,
  Button as MuiButton,
  Box as MuiBox,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { FormControl, Input, Chip, Icon } from 'components/ui';
import Card from './Card';
import { values as getValues } from 'ramda';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useTranslation } from 'react-i18next';

const CardCarePlan = memo(function CardCarePlan(props) {
  const [plans, setPlans] = useState([
    { label: 'Plan 1', value: 'plan1' },
    { label: 'Plan 2', value: 'plan2' },
  ]);
  const progressValue = 3;
  const progressTotal = 21;
  const { t } = useTranslation();

  const getTitleIcon = (props) => <Icon icon="hands-heart" {...props} />;

  return (
    <Card title={t('Protocols')} getTitleIcon={getTitleIcon}>
      {plans.length !== 0 ? (
        <>
          <MuiBox display="flex" justifyContent="space-between" mt={3} mb={1}>
            <Chip label="depression and anxiety" color="info" />
            <MuiButton variant="outlined" color="primary" size="small">
              {t('See plan details')}
            </MuiButton>
          </MuiBox>
          <BorderLinearProgress
            variant="determinate"
            color="primary"
            value={Math.round((progressValue / progressTotal) * 100)}
          />
          <MuiBox display="flex" justifyContent="space-between">
            <MuiTypography variant="subtitle1" color="textSecondary">
              {t('Day')} {progressValue} {t('of')} {progressTotal}
            </MuiTypography>
            <MuiTypography variant="subtitle1" color="textSecondary">
              {t('Started on')} {format(new Date(), 'd MMM. yyyy')}
            </MuiTypography>
          </MuiBox>

          <MuiBox width={'60%'} margin={'15px auto 0'}>
            <Autocomplete
              options={getValues(plans)}
              getOptionLabel={(option) => option.label}
              style={{ width: 300 }}
              renderInput={(params) => (
                <FormControl fullWidth style={{ marginBottom: '15px' }}>
                  <Input
                    {...params}
                    placeholder="Show 2 expired plans"
                    variant="outlined"
                  />
                </FormControl>
              )}
            />
          </MuiBox>
        </>
      ) : (
        <MuiTypography variant="h5" color="textSecondary">
          {t('No protocols')}
        </MuiTypography>
      )}
    </Card>
  );
});

export default CardCarePlan;
