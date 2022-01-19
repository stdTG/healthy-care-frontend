import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { Box as MuiBox } from '@material-ui/core';

import { Icon, Typography } from 'components/ui';
import { Button } from 'components';
import FormInput from '../../../../../components/ui/FormInput';
import FormControl from '../../../../../components/ui/FormControl';
import { Input } from 'components/ui';
import { useSelector } from 'react-redux';
import { selectors } from '../../../carePlanService';
import styled from 'styled-components';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { TextField as RffTextField } from 'mui-rff';
import { SFormControl } from 'pages/CarePlans/Builder/TabBuild/styled/question';
import { useTranslation } from 'react-i18next';

function EditCalculator(props) {
  const { onSave, initialValues } = props;
  const variables = useSelector(selectors.getCarePlanVariables);
  const [calculatorInputValue, setCalculatorInputValue] = useState('');
  const [calculatorPopoverIsShown, setCalculatorPopoverIsShown] = useState(
    false
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues.calculatorInputValue) {
      setCalculatorInputValue(initialValues.calculatorInputValue);
    }
  }, [initialValues]);

  const openChooseVariablePopover = () => {
    setCalculatorPopoverIsShown(true);
  };

  return (
    <Form
      onSubmit={(values) => onSave({ ...values, calculatorInputValue })}
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
            <MuiBox m={2} display="flex" flexDirection="column" width="450px">
              <Typography variant="h5" mb={4}>
                <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                {t('Edit calculator')}
              </Typography>

              <FormControl label={t('Widget variable name')}>
                <FormInput
                  name="variableName"
                  placeholder={t('Widget variable name')}
                  style={{ width: '100%' }}
                />
              </FormControl>

              <FormControl
                label={
                  <CalculatorLabel>
                    <div>{t('Formula')}</div>
                    <Button
                      title={t('Add variable')}
                      onClick={openChooseVariablePopover}
                    />
                  </CalculatorLabel>
                }
              >
                {/*<FormInput*/}
                {/*  name="formula"*/}
                {/*  placeholder="(variable1 + variable2) / 3"*/}
                {/*  style={{ width: '100%' }}*/}
                {/*  onChange={(e) => console.log(e)}*/}
                {/*/>*/}
                <Input
                  variant="outlined"
                  placeholder="(variable1 + variable2) / 3"
                  value={calculatorInputValue}
                  onChange={(e) => setCalculatorInputValue(e.target.value)}
                />

                {calculatorPopoverIsShown && variables.length ? (
                  <CalculatorPopover>
                    {variables &&
                      variables.map((variable) => {
                        return (
                          <PopoverItem
                            onClick={() => {
                              setCalculatorInputValue(
                                calculatorInputValue + variable.variableName
                              );
                              setCalculatorPopoverIsShown(false);
                            }}
                          >
                            {variable.id === initialValues.id
                              ? values.variableName
                              : variable.variableName}
                          </PopoverItem>
                        );
                      })}
                  </CalculatorPopover>
                ) : (
                  <></>
                )}
              </FormControl>

              <FieldArray name="scores">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <ScoreWrap key={name}>
                      <div
                        style={{
                          marginRight: '15px',
                        }}
                      >
                        <SFormControl label={'Score. #' + (index + 1)}>
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
                        <div style={{ paddingLeft: '100px' }}>
                          <RffTextField
                            type="number"
                            autoComplete="off"
                            variant="outlined"
                            size="small"
                            name={`${name}.resultScore`}
                            placeholder="Result score"
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
                title="Add score"
                style={{ marginRight: '10px', marginBottom: 10 }}
              />

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

export default EditCalculator;

const CalculatorPopover = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 15px;
  padding: 10px 10px;
  border: 0.5px solid gray;
  border-radius: 15px;
`;
const PopoverItem = styled.div`
  padding: 5px 5px;
  border-radius: 8px;
  transition: background-color 0.2s;
  &:hover {
    color: white;
    background-color: #0077ff;
    cursor: pointer;
  }
`;
const CalculatorLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
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
