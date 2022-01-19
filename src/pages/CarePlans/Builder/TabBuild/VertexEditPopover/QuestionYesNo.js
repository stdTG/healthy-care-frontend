import React from 'react';
import shortid from 'shortid';
import { mergeDeepRight } from 'ramda';
import { Form } from 'react-final-form';
import { Box as MuiBox } from '@material-ui/core';

import { Button } from 'components';
import STextField from '../styled/STextField';
import { SFormControl } from '../styled/question';
import { FormControl, Icon, Typography } from 'components/ui';
import { vertexTypes } from 'lib/enums/vertexTypes';
import FormInput from '../../../../../components/ui/FormInput';
import { useTranslation } from 'react-i18next';

const parentWidth = 250;
const parentHeight = 80;
const parentWithChildHeight = 120;
const childOffsetY = 50;
const childHeight = 30;
const childWidth = 50;
const childSpace = 50;

const getChoice = (option) => ({
  id: shortid.generate(),
  value: {
    text: option,
    type: vertexTypes.choices,
  },
  offsetY: childOffsetY,
  width: childWidth,
  height: childHeight,
});

function QuestionYesNo(props) {
  const { onSave, initialValues, type } = props;
  const { t } = useTranslation();

  const children =
    initialValues &&
    initialValues.children &&
    initialValues.children.length !== 0
      ? initialValues.children
      : [getChoice('Yes'), getChoice('No')];

  const onSubmit = (values) => {
    const choicesLength = 2 * (childWidth + childSpace) - childSpace;
    const newChoices = children.map((item, index) => ({
      ...item,
      offsetX: index * (childWidth + childSpace) - choicesLength / 2,
    }));

    onSave({
      ...values,
      isChildrenShown: true,
      children: values.children && mergeDeepRight(newChoices, values.children),
      questionType: type,
      width: parentWidth,
      height: values.isChildrenShown ? parentHeight : parentWithChildHeight,
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MuiBox m={2} display="flex" flexDirection="column" width="450px">
              <Typography variant="h5" mb={4}>
                <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                {t('Edit question: Yes/No')}
              </Typography>

              <FormControl label={t('Widget variable name')}>
                <FormInput
                  name="variableName"
                  placeholder={t('Widget variable name')}
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
              {children.map((item, index) => (
                <SFormControl
                  label={t('Answer') + ' ' + (index + 1)}
                  key={item.id}
                >
                  <Typography>{children[index].value.text}</Typography>
                </SFormControl>
              ))}
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

export default QuestionYesNo;
