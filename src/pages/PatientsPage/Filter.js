import React, { useEffect, useMemo, useState } from 'react';
import { Typography as MuiTypography } from '@material-ui/core';
import { Form, useForm, useFormState } from 'react-final-form';
import { FormControl, Search } from 'components/ui';
import { Checkboxes as RffCheckboxes } from 'mui-rff';
import styled from 'styled-components';
import AppSlider from '../../components/ui/Slider';
import LinearProgress from 'components/ui/LinearPropgress';
import { patientByAgeData } from 'pages/PatientsPage/patientByAgeData';
import { Line } from 'react-chartjs-2';
import { optionsForLine } from '../PatientsPage/patientByAgeOptions';
import { colorsForLinearProgressByRisk } from '../PatientsPage/patientByAgeOptions';
import Typography from '@material-ui/core/Typography';
import colors from 'lib/colors';

import { GET_AGE_STATISTIC } from 'pages/DashboardPage/gqlSchemes/getAgeStatistic';
import { GET_GENDER_STATISTIC } from 'pages/DashboardPage/gqlSchemes/getGenderStatistic';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

const byRiskDataMock = [
  {
    key: 'noRisk',
    value: 30,
  },
  {
    key: 'toWatch',
    value: 50,
  },
  {
    key: 'critical',
    value: 80,
  },
];

function Filter({ filters, setFilters, patients }) {
  const {
    data: genderStatistic,
    loading: genderStatisticLoading,
    error: genderStatisticError,
  } = useQuery(GET_GENDER_STATISTIC);

  const { data: ageStatistic } = useQuery(GET_AGE_STATISTIC);
  const { t } = useTranslation();

  const initialValues = useMemo(
    () => ({
      noRisk: false,
      toWatch: false,
      critical: false,
      male: filters?.gender?.includes('MALE'),
      female: filters?.gender?.includes('FEMALE'),
      other: filters?.gender?.includes('OTHER'),
      withActivePlan: false,
      noPlan: false,
      startAge: filters?.startAge || 0,
      endAge: filters?.endAge || 100,
    }),
    [filters]
  );

  const genders = genderStatistic?.statistics.byGender?.items;

  const getStatisticByName = (name) => {
    return (
      genderStatistic?.statistics.byGender?.items.find(
        (statistic) => statistic.key === name
      ) || {}
    );
  };

  const setGenderFilters = (values, genderName) => {
    setFilters({
      ...filters,
      gender: !values[genderName]
        ? [...filters.gender, genderName?.toUpperCase()]
        : [...filters.gender.filter((i) => i !== genderName?.toUpperCase())],
    });
  };

  function setAgeFilter([startAge, endAge]) {
    setFilters({
      ...filters,
      startAge,
      endAge,
    });
  }

  return (
    <SContainer>
      <Form onSubmit={console.log} initialValues={initialValues}>
        {({ values }) => {
          return (
            <div>
              <FormControl label={t('BY RISK')} color="textSecondary">
                <div style={{ marginBottom: '15px' }}>
                  <LinearProgress
                    data={byRiskDataMock}
                    getItemValue={(item) => item?.value}
                    colors={colorsForLinearProgressByRisk}
                  />
                </div>
                <SCheckBoxGroup>
                  <SCheckBoxWrap>
                    <RffCheckboxes
                      name="noRisk"
                      data={[
                        {
                          label: t('No risk'),
                          value: 'noRisk',
                        },
                      ]}
                    />

                    <MuiTypography color="textSecondary" variant="h5">
                      345
                    </MuiTypography>
                  </SCheckBoxWrap>

                  <SCheckBoxWrap>
                    <RffCheckboxes
                      name="toWatch"
                      data={[
                        {
                          label: t('To watch'),
                          value: 'toWatch',
                        },
                      ]}
                    />
                    <MuiTypography color="textSecondary" variant="h5">
                      345
                    </MuiTypography>
                  </SCheckBoxWrap>

                  <SCheckBoxWrap>
                    <RffCheckboxes
                      name="critical"
                      data={[
                        {
                          label: t('Critical'),
                          value: 'critical',
                        },
                      ]}
                    />

                    <MuiTypography color="textSecondary" variant="h5">
                      345
                    </MuiTypography>
                  </SCheckBoxWrap>
                </SCheckBoxGroup>
              </FormControl>

              <FormControl label={t('BY CONDITION')} color="textSecondary">
                <div style={{ marginBottom: '10px', marginTop: '8px' }}>
                  <Search
                    size="small"
                    placeholder={`${t('Search conditions')}...`}
                    backgroundColor="#ECEEF2"
                  />
                </div>
                <SCheckBoxWrap>
                  <RffCheckboxes
                    name="covid19"
                    data={[
                      {
                        label: t('Covid-19'),
                        value: 'covid19',
                      },
                    ]}
                  />

                  <MuiTypography color="textSecondary" variant="h5">
                    345
                  </MuiTypography>
                </SCheckBoxWrap>
              </FormControl>

              <FormControl label={t('BY SEX')} color="textSecondary">
                {patients?.length !== 0 ? (
                  <div style={{ marginBottom: '15px' }}>
                    {genders && (
                      <LinearProgress
                        data={genders}
                        getItemValue={(item) => item?.value}
                      />
                    )}
                  </div>
                ) : (
                  <Typography>{t("You don't have patients yet")} </Typography>
                )}
                <SCheckBoxGroup>
                  <SCheckBoxWrap>
                    <RffCheckboxes
                      name="male"
                      disabled={patients?.length === 0}
                      onClick={() => setGenderFilters(values, 'male')}
                      data={[
                        {
                          label: t('Male'),
                          value: 'male',
                        },
                      ]}
                    />

                    <MuiTypography color="textSecondary" variant="h5">
                      {getStatisticByName('male').value}
                    </MuiTypography>
                  </SCheckBoxWrap>

                  <SCheckBoxWrap>
                    <RffCheckboxes
                      name="female"
                      disabled={patients?.length === 0}
                      onClick={() => setGenderFilters(values, 'female')}
                      data={[
                        {
                          label: t('Female'),
                          value: 'female',
                        },
                      ]}
                    />

                    <MuiTypography color="textSecondary" variant="h5">
                      {getStatisticByName('female').value}
                    </MuiTypography>
                  </SCheckBoxWrap>

                  <SCheckBoxWrap>
                    <RffCheckboxes
                      name="other"
                      disabled={patients?.length === 0}
                      onClick={() => setGenderFilters(values, 'other')}
                      data={[
                        {
                          label: t('Other'),
                          value: 'other',
                        },
                      ]}
                    />

                    <MuiTypography color="textSecondary" variant="h5">
                      {getStatisticByName('other').value}
                    </MuiTypography>
                  </SCheckBoxWrap>
                </SCheckBoxGroup>
              </FormControl>

              <FormControl label={t('BY AGE')} color="textSecondary">
                <div style={{ height: '100px' }}>
                  <Line
                    data={(canvas) => patientByAgeData(canvas)}
                    showLines={false}
                    options={optionsForLine}
                  />
                </div>
                <AppSlider
                  onChangeCommitted={setAgeFilter}
                  initialValues={[values.startAge, values.endAge]}
                />
              </FormControl>

              <FormControl label={t('BY LOCATION')} color="textSecondary">
                <div style={{ marginTop: '8px' }}>
                  <Search
                    size="small"
                    placeholder={`${t('Add postal code or city')}...`}
                    backgroundColor="#ECEEF2"
                  />
                </div>
              </FormControl>

              <FormControl label={t('BY HEALTH PLAN')} color="textSecondary">
                <div style={{ marginTop: '8px' }}>
                  <SCheckBoxWrap>
                    <RffCheckboxes
                      name="withActivePlan"
                      data={[
                        {
                          label: t('With active plan'),
                          value: 'withActivePlan',
                        },
                      ]}
                    />

                    <MuiTypography color="textSecondary" variant="h5">
                      345
                    </MuiTypography>
                  </SCheckBoxWrap>

                  <SCheckBoxWrap>
                    <RffCheckboxes
                      name="noPlan"
                      data={[
                        {
                          label: t('No plan'),
                          value: 'noPlan',
                        },
                      ]}
                    />

                    <MuiTypography color="textSecondary" variant="h5">
                      345
                    </MuiTypography>
                  </SCheckBoxWrap>
                </div>
              </FormControl>
            </div>
          );
        }}
      </Form>
    </SContainer>
  );
}

export default Filter;

const SContainer = styled.div`
  padding-right: 30px;
`;
const SCheckBoxGroup = styled.div`
  padding-top: 15px;
`;
const SCheckBoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  .MuiCheckbox-root {
    color: black;
    width: 13px;
    height: 13px;
    margin-left: 10px;
    margin-right: 15px;
  }
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
  }
  .MuiTypography-body1 {
    font-weight: 600;
  }
  .Mui-checked,
  .Mui-checked + .MuiFormControlLabel-label {
    color: ${colors.orange100};
  }
`;
