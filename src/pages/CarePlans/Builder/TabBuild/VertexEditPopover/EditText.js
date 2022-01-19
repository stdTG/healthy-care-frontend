import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { Box as MuiBox } from '@material-ui/core';

import { Icon, Typography } from 'components/ui';
import STextField from '../styled/STextField';
import { Button } from 'components';
import { useSelector } from 'react-redux';
import { selectors } from 'pages/CarePlans/carePlanService';
import { useTranslation } from 'react-i18next';

function EditText(props) {
  const { onSave, initialValues } = props;
  const { t } = useTranslation();

  const variables = useSelector(selectors.getCarePlanVariables);
  const [calculatorInputValue, setCalculatorInputValue] = useState('');
  const [calculatorPopoverIsShown, setCalculatorPopoverIsShown] = useState(
    false
  );

  const handleCalculatorPopover = (inputValue) => {
    setCalculatorInputValue(inputValue);
    if (inputValue.includes('$')) {
      setCalculatorPopoverIsShown(true);
      return;
    }
    setCalculatorPopoverIsShown(false);
  };

  const onAddVariable = (variable) => {
    setCalculatorInputValue(
      calculatorInputValue.replace('$', variable.variableName)
    );
    setCalculatorPopoverIsShown(false);
  };

  return (
    <Form
      onSubmit={onSave}
      initialValues={initialValues}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MuiBox m={2} display="flex" flexDirection="column" width="350px">
              <Typography variant="h5" mb={4}>
                <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                {t('Text setting')}
              </Typography>
              <Typography>{t('Text')}</Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                style={{ width: '300px' }}
              >
                {t(
                  'Type the text that will be displayed to the user. You can also insert variables such as his or her name, weight etc.'
                )}
              </Typography>

              <STextField name="text" placeholder={t('Your text here')} />
              <Typography variant="subtitle1" color="textSecondary">
                {t('Start typing "$" to insert a variable.')}
              </Typography>
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

export default EditText;
