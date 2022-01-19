import React, { useState } from 'react';
import shortid from 'shortid';
import { mergeDeepRight, map, addIndex, values as getValues } from 'ramda';
import { Form } from 'react-final-form';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';
import {
  TextField as RffTextField,
  Checkboxes as RffCheckboxes,
} from 'mui-rff';

import { Button } from 'components';
import STextField from '../styled/STextField';
import { SFormControl } from '../styled/question';
import { vertexTypes } from 'lib/enums/vertexTypes';
import { FormControl, Icon, Typography } from 'components/ui';
import FormInput from '../../../../../components/ui/FormInput';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import styled from 'styled-components';
import { MetricTypeSelect } from '../styled/metricType';
import { metricTypesData } from 'lib/enums/metrics';
import { useTranslation } from 'react-i18next';

const parentWidth = 250;
const parentHeight = 80;
const childOffsetY = 50;
const childHeight = 50;
const childBoxHeight = 25;
const childWidth = 100;
const childSpace = 50;

function QuestionMultipleChoice(props) {
  const { initialValues, onSave, type, graph } = props;
  // const clearChildren = initialValues.children.filter(
  //   (child) => child !== undefined
  // );
  const [choices, setChoice] = useState(initialValues?.children || []);
  const { t } = useTranslation();

  const addChoice = () => {
    const newChoice = {
      id: shortid.generate(),
      value: {
        text: null,
        type: vertexTypes.choices,
        childParentId: initialValues?.id,
      },
      offsetY: childOffsetY,
      width: childWidth,
      height: childHeight,
    };
    setChoice([...choices, newChoice]);
  };

  const deleteChoice = (index) => {
    setChoice(
      choices.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            isDeleted: true,
          };
        }

        return item;
      })
    );
    // const choice = choices.find((item, idx) => idx !== index)
    // graph.removeCell(choice)
  };

  const onSubmit = (values) => {
    const choicesLength =
      choices && choices.length * (childWidth + childSpace) - childSpace;

    const newChoices = choices
      ? choices
          .map((choice, index) => {
            return {
              ...choice,
              ...values.children[index],
            };
          })
          .map((item, index) => {
            if (item?.isDeleted) {
              const cells = graph.getChildCells();
              const cell = cells.find((cell) => {
                console.log(cell.id, '1111');
                console.log(item.id, '222');
                return cell.id === item.id;
              });
              console.log(cell, 'cell4');
              graph.removeCells([cell]);

              return undefined;
            }

            return {
              ...item,
              value: {
                ...item.value,
                text: item.text,
              },
              offsetX: index * (childWidth + childSpace) - choicesLength / 2,
            };
          })
      : [];
    // let newChoices = mergeDeepRight(choices, values.children);
    // newChoices = addIndex(map)(
    //   (item, index) => {
    //     if (item?.isDeleted) {
    //       const cells = graph.getChildCells()
    //       const cell = cells.find((cell) => {
    //         console.log(cell.id, '1111')
    //         console.log(item.id, '222')
    //       })
    //       // console.log(cell, 'cell4')
    //       graph.removeCells([cell])
    //
    //       return
    //     }
    //
    //     return {
    //       ...item,
    //       value: {
    //         ...item.value,
    //         text: item.text
    //       },
    //       offsetX: index * (childWidth + childSpace) - choicesLength / 2,
    //     }
    //   },
    //   newChoices
    // );

    onSave({
      ...values,
      children: getValues(newChoices),
      questionType: type,
      width: parentWidth,
      height: values.isChildrenShown
        ? parentHeight
        : parentHeight + childBoxHeight * choices.length,
    });
  };
  console.log(choices, 'CHOICes');
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        ...initialValues,
        // children: clearChildren
      }}
      mutators={{
        ...arrayMutators,
      }}
      render={({
        values,
        handleSubmit,
        form: {
          mutators: { push, pop },
        },
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MuiBox m={2} display="flex" flexDirection="column" width="350px">
              <Typography variant="h5" mb={4}>
                <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                {t('Edit question: Multiple choice')}
              </Typography>

              <FormControl label={t('Widget variable name')}>
                <FormInput
                  name="variableName"
                  placeholder={t('Widget variable name')}
                  style={{ width: '100%' }}
                />
              </FormControl>

              <FormControl label={t('Question text')}>
                <STextField
                  name="text"
                  placeholder={t(
                    'Type question here... You can type { to insert a variable'
                  )}
                />
              </FormControl>

              <FieldArray name="children">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <ScoreWrap key={index}>
                      <div
                        style={{
                          marginRight: '15px',
                        }}
                      >
                        <SFormControl label={t('Choice') + ' ' + (index + 1)}>
                          <RffTextField
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            name={`${name}.text`}
                            placeholder={`${t('Reply text')}...`}
                          />
                        </SFormControl>
                        <SFormControl label={t('Score') + ' ' + (index + 1)}>
                          <RffTextField
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            name={`${name}.score`}
                            placeholder="0"
                          />
                        </SFormControl>
                      </div>
                      <IconWrap>
                        <Icon
                          icon="times"
                          size={'lg'}
                          onClick={() => {
                            deleteChoice(index);
                            fields.remove(index);
                          }}
                        />
                      </IconWrap>
                    </ScoreWrap>
                  ))
                }
              </FieldArray>

              <Button
                onClick={() => {
                  addChoice();
                  push('children', undefined);
                }}
                icon="plus"
                title={t('choice')}
                style={{ marginRight: '10px' }}
              />

              <div>
                <RffCheckboxes
                  name="isChildrenShown"
                  disabled={initialValues?.isSource}
                  size="small"
                  data={[
                    {
                      label: (
                        <MuiTypography
                          variant="subtitle2"
                          color={
                            initialValues?.isSource
                              ? 'textSecondary'
                              : 'textPrimary'
                          }
                        >
                          {t('Show choices in graph')}
                        </MuiTypography>
                      ),
                      value: true,
                    },
                  ]}
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

export default QuestionMultipleChoice;

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
