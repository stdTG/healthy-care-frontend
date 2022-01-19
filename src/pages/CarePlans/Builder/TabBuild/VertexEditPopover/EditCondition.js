import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import { Box as MuiBox } from '@material-ui/core';

import { Icon, Typography } from 'components/ui';
import { Button } from 'components';
import FormControl from '../../../../../components/ui/FormControl';
import { useSelector } from 'react-redux';
import { selectors } from '../../../carePlanService';
import styled from 'styled-components';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { TextField as RffTextField } from 'mui-rff';
import { SFormControl } from 'pages/CarePlans/Builder/TabBuild/styled/question';
import { SelectVariable } from '../styled/selectVariable';
import shortid from 'shortid';
import { vertexTypes } from 'lib/enums/vertexTypes';
import { values as getValues } from 'ramda';
import STextField from '../styled/STextField';

const parentWidth = 250;
const parentHeight = 50;
const childOffsetY = 50;
const childHeight = 80;
const childBoxHeight = 25;
const childWidth = 120;
const childSpace = 50;

function EditCondition(props) {
  const { onSave, initialValues } = props;
  const variables = useSelector(selectors.getCarePlanVariables);
  const [conditions, setConditions] = useState([]);

  const addCondition = () => {
    const newCondition = {
      id: shortid.generate(),
      value: {
        startValue: '',
        endValue: '',
        type: vertexTypes.conditionChild,
        childParentId: initialValues?.id,
      },
      offsetY: childOffsetY,
      width: childWidth,
      height: childHeight,
    };
    setConditions([...conditions, newCondition]);
  };

  const deleteCondition = (index) => {
    setConditions(conditions.filter((item, idx) => idx !== index));
  };

  const onSubmit = (values) => {
    const conditionsLength =
      conditions &&
      (conditions.length + 1) * (childWidth + childSpace) - childSpace;

    const newConditions = conditions
      ? conditions.map((condition, index) => {
          return {
            ...condition,
            ...values.children[index],
            text: `Condition ${index + 1}`,
            offsetX: index * (childWidth + childSpace) - conditionsLength / 2,
          };
        })
      : [];

    newConditions.push({
      id: shortid.generate(),
      value: {
        type: vertexTypes.conditionChild,
        childParentId: initialValues?.id,
      },
      offsetY: childOffsetY,
      width: childWidth,
      height: childHeight,
      text: 'Default Condition',
      offsetX:
        conditions.length * (childWidth + childSpace) - conditionsLength / 2,
    });

    onSave({
      ...values,
      children: getValues(newConditions),
      width: parentWidth,
      height: parentHeight,
    });
  };

  const init = useMemo(() => {
    return {
      ...initialValues,
      children:
        initialValues.children?.filter(
          (item) => item.text !== 'Default Condition'
        ) || [],
    };
  }, [initialValues]);

  useEffect(() => {
    setConditions(init.children);
  }, [init]);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={init}
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
            <MuiBox m={2} display="flex" flexDirection="column" width="450px">
              <Typography variant="h5" mb={4}>
                <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                Edit condition
              </Typography>

              <FormControl label="Widget variable name">
                <SelectVariable
                  name="variableName"
                  placeholder="Widget variable name..."
                  options={variables}
                />
              </FormControl>

              <FieldArray name="children">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <ScoreWrap key={name}>
                      <div
                        style={{
                          marginRight: '15px',
                        }}
                      >
                        <SFormControl label={'Condition. #' + (index + 1)}>
                          <RffTextField
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            name={`${name}.startValue`}
                            placeholder="Start value"
                            style={{ marginRight: '15px' }}
                          />

                          <RffTextField
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            name={`${name}.endValue`}
                            placeholder="End value"
                          />
                        </SFormControl>
                      </div>
                      <IconWrap>
                        <Icon
                          icon="times"
                          size={'lg'}
                          onClick={() => {
                            deleteCondition(index);
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
                  addCondition();
                  push('children', undefined);
                }}
                icon="plus"
                title="Add condition"
                style={{ marginRight: '10px', marginBottom: 10 }}
              />

              <Button
                onClick={handleSubmit}
                title="Save"
                style={{ alignSelf: 'center' }}
              />
            </MuiBox>
          </form>
        );
      }}
    />
  );
}

export default EditCondition;

const IconWrap = styled.div`
  color: gray;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const ScoreWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
