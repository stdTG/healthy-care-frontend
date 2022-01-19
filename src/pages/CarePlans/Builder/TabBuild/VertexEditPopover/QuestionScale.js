import React from 'react';
import { Form } from 'react-final-form';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';
import {
  TextField as RffTextField,
  Checkboxes as RffCheckboxes,
} from 'mui-rff';

import { Button } from 'components';
import { FormControl, Icon, Typography } from 'components/ui';
import STextField from 'pages/CarePlans/Builder/TabBuild/styled/STextField';
import { SFormControl } from 'pages/CarePlans/Builder/TabBuild/styled/question';
import styled from 'styled-components';
import FormInput from '../../../../../components/ui/FormInput';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import { MetricTypeSelect } from '../styled/metricType';
import { values as getValues } from 'ramda';
import { metricTypesData } from 'lib/enums/metrics';
import { useTranslation } from 'react-i18next';

const parentWidth = 250;
const parentHeight = 200;

function QuestionScale(props) {
  const { onSave, initialValues, type } = props;
  const { t } = useTranslation();

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
      mutators={{
        ...arrayMutators,
      }}
      render={({
        handleSubmit,
        values,
        form: {
          mutators: { push, pop },
        },
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MuiBox m={2} display="flex" flexDirection="column" width="350px">
              <Typography variant="h5" mb={4}>
                <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                {t('Edit question: Scale')}
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

              <SFormControl label={t('Start scale')}>
                <RffTextField
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  name="startScale"
                  placeholder="0 or 1"
                />
              </SFormControl>
              <SFormControl label={t('End scale')}>
                <RffTextField
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  name="endScale"
                  placeholder="5 or 11"
                />
              </SFormControl>
              <SFormControl label={t('Left label')}>
                <RffTextField
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  name="leftLabel"
                  placeholder="0/24"
                />
              </SFormControl>
              <SFormControl label={t('Center label')}>
                <RffTextField
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  name="centerLabel"
                  placeholder="0/24"
                />
              </SFormControl>
              <SFormControl label={t('Right label')}>
                <RffTextField
                  autoComplete="off"
                  variant="outlined"
                  size="small"
                  name="rightLabel"
                  placeholder="0/24"
                />
              </SFormControl>
              <FieldArray name="scores">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <ScoreWrap key={name}>
                      <div
                        style={{
                          marginRight: '15px',
                        }}
                      >
                        <SFormControl label={t('Score') + '. #' + (index + 1)}>
                          <RffTextField
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            name={`${name}.startValue`}
                            placeholder={t('Start value')}
                            style={{ marginRight: '15px' }}
                          />

                          <RffTextField
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            name={`${name}.endValue`}
                            placeholder={t('End value')}
                          />
                        </SFormControl>
                        <div style={{ paddingLeft: '100px' }}>
                          <RffTextField
                            type="number"
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            name={`${name}.resultScore`}
                            placeholder={t('Result score')}
                          />
                        </div>
                      </div>
                      <IconWrap>
                        <Icon
                          icon="times"
                          size={'lg'}
                          onClick={() => fields.remove(index)}
                        />
                      </IconWrap>
                    </ScoreWrap>
                  ))
                }
              </FieldArray>

              <Button
                onClick={() => push('scores', undefined)}
                icon="plus"
                title={t('Add score')}
                style={{ marginRight: '10px' }}
              />
              <div>
                <RffCheckboxes
                  name="showLabels"
                  size="small"
                  data={[
                    {
                      label: (
                        <MuiTypography variant="subtitle2">
                          {t('Show labels')}
                        </MuiTypography>
                      ),
                      value: true,
                    },
                  ]}
                />

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

              <Button
                onClick={handleSubmit}
                title={t('Save')}
                style={{ alignSelf: 'center' }}
              />
            </MuiBox>
          </form>
        );
      }}
    />
  );
}

export default QuestionScale;

const IconWrap = styled.div`
  color: gray;
  &:hover {
    cursor: pointer;
  }
`;
const ScoreWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
