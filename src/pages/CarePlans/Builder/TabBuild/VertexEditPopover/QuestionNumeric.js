import React, { useRef } from 'react';

import { Button } from 'components';
import STextField from '../styled/STextField';
import { SFormControl, AC } from '../styled/question';
import {
  Icon,
  Typography,
  FormControl,
  FormTextField,
  Space,
} from 'components/ui';
import {
  Box as MuiBox,
  Typography as MuiTypography,
  IconButton as MuiIconButton,
} from '@material-ui/core';
import { Form } from 'react-final-form';
import FormInput from '../../../../../components/ui/FormInput';
import { Checkboxes as RffCheckboxes } from 'mui-rff';
import { values as getValues } from 'ramda';
import { metricTypesData } from 'lib/enums/metrics';
import { MetricTypeSelect } from '../styled/metricType';
import { useTranslation } from 'react-i18next';

const parentWidth = 250;
const parentHeight = 180;

function QuestionNumeric(props) {
  const { onSave, initialValues, type, openCalc, openSettings } = props;
  const calcRef = useRef();
  const settingsRef = useRef();
  const { t } = useTranslation();

  const options = [
    { type: '1', text: 'Kilo - kg' },
    { type: '2', text: 'Meters - m' },
  ];

  const onSubmit = (values) => {
    onSave({
      ...values,
      questionType: type,
      width: parentWidth,
      height: parentHeight,
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ values, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MuiBox m={2}>
              <Typography variant="h5" mb={4}>
                <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                {t('Edit question: Numeric')}
              </Typography>

              <FormControl label={t('Widget variable name')}>
                <FormInput
                  name="variableName"
                  placeholder={t('Widget variable name')}
                  style={{ width: '100%' }}
                />
              </FormControl>

              <FormControl label={t('Question text')}>
                <STextField name="text" placeholder={t('Your text here')} />
              </FormControl>

              <SFormControl label={t('Min number')}>
                <FormTextField name="min" type="number" placeholder={0} />
              </SFormControl>
              <SFormControl label={t('Max number')}>
                <FormTextField name="max" type="number" placeholder={0} />
              </SFormControl>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginBottom: '20px',
                }}
              >
                <MuiTypography
                  variant="h6"
                  gutterBottom
                  style={{ minWidth: '100px' }}
                >
                  {t('Add a prefix')}
                </MuiTypography>
                <AC
                  name="prefix"
                  placeholder={t('Select prefix')}
                  options={options}
                />
              </div>

              <div>
                <RffCheckboxes
                  name="saveAsMetric"
                  size="small"
                  data={[
                    {
                      label: (
                        <MuiTypography variant="subtitle2">
                          {t('Save variable as a metric')}
                        </MuiTypography>
                      ),
                      value: true,
                    },
                  ]}
                />
              </div>

              {values.saveAsMetric && (
                <div style={{ marginTop: 15 }}>
                  <MuiTypography
                    variant="h6"
                    gutterBottom
                    style={{ minWidth: '100px' }}
                  >
                    Metric Type
                  </MuiTypography>
                  <MetricTypeSelect
                    name="metricType"
                    placeholder="Select metric type"
                    options={getValues(metricTypesData)}
                  />
                </div>
              )}

              <MuiBox
                display="flex"
                justifyContent="space-between"
                style={{ marginTop: '30px' }}
              >
                <div style={{ width: '100px' }}>
                  {/*<MuiIconButton*/}
                  {/*  color="primary"*/}
                  {/*  style={{ padding: '7px 0' }}*/}
                  {/*  onClick={() => openSettings({ anchorEl: settingsRef })}*/}
                  {/*  ref={settingsRef}*/}
                  {/*>*/}
                  {/*  <Icon icon="cog" size="xs" />*/}
                  {/*</MuiIconButton>*/}
                </div>

                <Button onClick={handleSubmit} title="Save" />
                <div style={{ width: '100px', textAlign: 'right' }}>
                  <MuiIconButton
                    color="primary"
                    icon="calculator-alt"
                    style={{ padding: '7px 0' }}
                  >
                    <Icon icon="info-circle" size="xs" />
                  </MuiIconButton>
                </div>
              </MuiBox>
            </MuiBox>
          </form>
        );
      }}
    />
  );
}

export default QuestionNumeric;
