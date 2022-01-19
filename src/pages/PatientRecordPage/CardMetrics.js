import React, { useState, memo, useEffect } from 'react';
import { Autocomplete as RffAutocomplete, makeValidate } from 'mui-rff';
import { values as getValues, map, update, findIndex, transduce } from 'ramda';
import { Form } from 'react-final-form';
import { format, getTime, parseISO } from 'date-fns';
import useDialog from 'lib/hooks/useDialog';

import AddUsersToOrgUnitDialog from 'pagesAdmin/SettingsTeamsPage/AddUsersToOrgUnitDialog';
import FakeMetricChartDialog from 'components/ui/FakeMetricChartDialog';

import {
  Typography as MuiTypography,
  Divider as MuiDivider,
  Grid as MuiGrid,
  Box as MuiBox,
} from '@material-ui/core';

import {
  FormTextField,
  FormControl,
  IconButton,
  DatePicker,
  Icon,
  Input,
} from 'components/ui';
import AddButton from 'components/Buttons/AddButton';
import Card from './Card';
import { metricTypesData } from 'lib/enums/metrics';
import { schema } from './validation/cardMetrics';
import CardMetricsItem from 'pages/PatientRecordPage/CardMetricsItem';
import shortid from 'shortid';
import { useParams } from 'react-router-dom';
import DeleteButton from '../../components/Buttons/DeleteButton/index';
import { useTranslation } from 'react-i18next';

import { getCorrespondingFakeDataFromFakePatient } from 'lib/fakeData/fakePatientData';

const validate = makeValidate(schema);

const METRICS = {
  '1': 'Weight',
  '2': 'Height',
  '3': 'Heart rate',
  '4': 'Bmi',
  '5': 'Cough',
  '6': 'Temperature',
};

const risks = ['NORMAL', 'LOW', 'HIGH'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const CardMetrics = memo(function CardMetrics(props) {
  const { id } = useParams();
  const [isEditMode, setEditMode] = useState(false);
  const [editMetric, setEditMetric] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [metricItems, setMetricItems] = useState([]);
  const [isMetricEditMode, setIsMetricEditMode] = useState({
    id: '',
    isEdit: false,
  });
  const [metricValues, setMetricValues] = useState({});
  const { t } = useTranslation();

  const fakeMetricGraphDialog = useDialog();
  const [metricForGraph, setMetricForGraph] = useState({});

  useEffect(() => {
    if (!localStorage.hasOwnProperty('metrics')) {
      localStorage.setItem('metrics', JSON.stringify({}));
    }
  }, []);

  const metricsAfterParse = JSON.parse(localStorage.getItem('metrics'));
  // const currentMetrics = metricsAfterParse && metricsAfterParse[id];

  const currentMetrics = getCorrespondingFakeDataFromFakePatient(id, 'metrics');

  const onAdd = async (values) => {
    // let value = {}

    if (currentMetrics) {
      // const value = JSON.stringify({
      //   [id]: {
      //     ...currentMetrics,
      //     [values.metricType]: [...currentMetrics[values.metricType] || [], values]
      //   }
      // })
    }
    const value = JSON.stringify({
      ...metricsAfterParse,
      [id]: {
        ...currentMetrics,
        [values.metricType]: {
          id: shortid.generate(),
          risk: risks[getRandomInt(0, 3)],
          ...values,
        },
      },
    });

    localStorage.setItem('metrics', value);
    setEditMode(false);
  };

  const onDelete = (metricId) => {
    const newMetrics = Object.entries(currentMetrics).filter(
      ([metricType, item]) => item.id !== metricId
    );

    const value = JSON.stringify({
      ...metricsAfterParse,
      [id]: Object.fromEntries(newMetrics),
    });
    localStorage.setItem('metrics', value);
    setEditMode(false);
  };

  const onEdit = () => {
    setEditMode(!isEditMode);
  };

  const editItem = (code) => {
    setEditMetric(code);

    //TODO get items
    setMetricItems([
      {
        id: shortid.generate(),
        code: '1',
        date: getTime(new Date(2020, 6, 5)),
        value: 70,
      },
      {
        id: shortid.generate(),
        code: '1',
        date: getTime(new Date(2020, 5, 5)),
        value: 75,
      },
    ]);
  };

  const saveItem = (values) => {
    const newValue = update(
      findIndex((item) => item.id === values.id, metricItems),
      values,
      metricItems
    );

    setMetricItems(newValue);
  };

  const getTitleIcon = (props) => <Icon icon="chart-bar" {...props} />;

  const onEditMetric = (metric) => {
    console.log(metric, 'met');
    const value = JSON.stringify({
      ...metricsAfterParse,
      [id]: {
        ...currentMetrics,
        [metric.metricType]: {
          ...metric,
          value: metricValues?.[metric?.id]?.value,
        },
      },
    });
    localStorage.setItem('metrics', value);
    setIsMetricEditMode({
      id: metric?.id,
      isEdit: false,
    });
  };

  const MetricComponent = ({ title, item, style, measure }) => (
    <>
      <MuiTypography variant="h6" color="textSecondary">
        {title}
      </MuiTypography>
      <MuiTypography variant="h5">
        {item.value} {measure}
      </MuiTypography>
      <MuiTypography variant="subtitle1" color="textSecondary" style={style}>
        {format(parseISO(item.date), 'MMMM do yyyy')}
      </MuiTypography>
    </>
  );

  return (
    <>
      {!editMetric ? (
        <Card
          title={t('Metrics')}
          getTitleIcon={getTitleIcon}
          EditButton={
            <IconButton icon={isEditMode ? 'check' : 'pen'} onClick={onEdit} />
          }
        >
          {isEditMode && (
            <>
              <Form
                onSubmit={onAdd}
                initialValues={{
                  metricType: null,
                  date: new Date(),
                  value: null,
                }}
                validate={validate}
                render={({ values, handleSubmit, invalid }) => {
                  return (
                    <form>
                      <MuiBox mb={2}>
                        <MuiTypography variant="h5">
                          {t('Add a metric')}
                        </MuiTypography>
                      </MuiBox>
                      <RffAutocomplete
                        label=""
                        name="metricType"
                        variant="outlined"
                        options={getValues(metricTypesData)}
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <FormControl
                            fullWidth
                            style={{ marginBottom: '15px' }}
                          >
                            <Input
                              {...params}
                              placeholder={t('Type')}
                              variant="outlined"
                            />
                          </FormControl>
                        )}
                      />
                      <FormControl>
                        <FormTextField name="value" placeholder={t('Value')} />
                      </FormControl>
                      <FormControl>
                        <DatePicker
                          name="date"
                          id="date-picker-dialog"
                          placeholder={t('Started on')}
                          format="dd/MM/yyyy"
                          openTo="year"
                          variant="inline"
                          disableFuture={true}
                          KeyboardButtonProps={{
                            'aria-label': 'change date of start',
                          }}
                          inputVariant="outlined"
                        />
                      </FormControl>
                      <MuiBox display="flex" justifyContent="flex-end" mb={2}>
                        <AddButton
                          onClick={handleSubmit}
                          disabled={invalid}
                          title={t('Add metric')}
                          type="submit"
                        />
                      </MuiBox>

                      <div>
                        {currentMetrics &&
                          Object.entries(currentMetrics).map(
                            ([metricType, metric]) => (
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <div>
                                  {isMetricEditMode.id === metric?.id &&
                                  isMetricEditMode.isEdit ? (
                                    <div style={{ marginRight: '15px' }}>
                                      <Input
                                        variant="outlined"
                                        value={
                                          metricValues?.[metric?.id]?.value ||
                                          metric.value
                                        }
                                        style={{
                                          marginBottom: '15px',
                                          width: '100%',
                                        }}
                                        onChange={(e) =>
                                          setMetricValues({
                                            ...metricValues,
                                            [metric.id]: {
                                              value: e.target.value,
                                            },
                                          })
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <MetricComponent
                                      // measure={10}
                                      title={METRICS[metricType]}
                                      item={metric}
                                    />
                                  )}
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <div style={{ marginRight: '15px' }}>
                                    {isMetricEditMode.id === metric?.id &&
                                    isMetricEditMode.isEdit ? (
                                      <Icon
                                        icon="check"
                                        onClick={() => onEditMetric(metric)}
                                        size={20}
                                      />
                                    ) : (
                                      <Icon
                                        icon="pen"
                                        onClick={() =>
                                          setIsMetricEditMode({
                                            id: metric?.id,
                                            isEdit: true,
                                          })
                                        }
                                        size={20}
                                      />
                                    )}
                                  </div>
                                  <DeleteButton
                                    onClick={() => onDelete(metric.id)}
                                  />
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </form>
                  );
                }}
              />
              {metrics.map((item) => {
                return (
                  <>
                    <MuiDivider />
                    <MuiBox
                      justifyContent="space-between"
                      alignItems="center"
                      display="flex"
                      my={2}
                    >
                      <MuiBox>
                        <MuiTypography variant="h5">
                          {metricTypesData[item.code].label}
                        </MuiTypography>
                        <MuiTypography variant="body1" color="textSecondary">
                          {item.amount} values
                        </MuiTypography>
                      </MuiBox>

                      <IconButton
                        icon="pen"
                        color="primary"
                        onClick={() => {
                          editItem(item.code);
                        }}
                      />
                    </MuiBox>
                  </>
                );
              })}
            </>
          )}

          {!isEditMode ? (
            false === 0 ? (
              <MuiTypography variant="h5" color="textSecondary">
                {t('No metrics')}
              </MuiTypography>
            ) : (
              <MuiGrid container>
                {currentMetrics &&
                  Object.entries(currentMetrics).map(
                    ([metricIndex, metric]) => (
                      <MuiGrid item xs={6}>
                        {/*<div>*/}
                        {/*  {metricTypes[metricType]}*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*  {metric.value}*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*  {metric.date}*/}
                        {/*</div>*/}
                        <MetricComponent
                          // measure={10}
                          title={METRICS[metric.metricType]}
                          item={metric}
                        />
                        <AddButton
                          onClick={() => {
                            setMetricForGraph(METRICS[metric.metricType]);
                            fakeMetricGraphDialog.open(metricForGraph);
                          }}
                          icon="chart-bar"
                          title="See chart"
                          style={{ marginBottom: '20px' }}
                        />
                      </MuiGrid>
                    )
                  )}
              </MuiGrid>
            )
          ) : null}
        </Card>
      ) : (
        <Card
          title={`${t('Edit metric')} "${metricTypesData[editMetric].label}"`}
          getTitleIcon={() => (
            <IconButton
              icon="arrow-left"
              style={{ marginRight: '10px' }}
              onClick={() => setEditMetric(null)}
            />
          )}
        >
          {map(
            (item) => (
              <CardMetricsItem item={item} saveItem={saveItem} />
            ),
            metricItems
          )}
        </Card>
      )}

      <FakeMetricChartDialog
        isOpen={fakeMetricGraphDialog.isOpen}
        close={fakeMetricGraphDialog.close}
        initialData={metricForGraph}
      />
    </>
  );
});

export default CardMetrics;
