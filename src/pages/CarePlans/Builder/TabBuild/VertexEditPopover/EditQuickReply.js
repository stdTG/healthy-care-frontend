import React from 'react';
import shortid from 'shortid';
import { Form } from 'react-final-form';
import { Box as MuiBox } from '@material-ui/core';

import { SReplyField } from '../styled/editQuickReply';
import { vertexTypes } from 'lib/enums/vertexTypes';
import { Icon, Typography } from 'components/ui';
import STextField from '../styled/STextField';
import { Button } from 'components';
import { useTranslation } from 'react-i18next';

function EditQuickReply(props) {
  const { initialData, onSave } = props;
  const initialValues = getInitialValues(initialData && initialData);
  const { t } = useTranslation();

  const onSubmit = (values) => {
    onSave({ ...values, width: 200, height: 80 });
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MuiBox m={2} display="flex" flexDirection="column" width="450px">
              <div>
                <Typography variant="h5" mb={4}>
                  <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                  {t('Quick reply settings')}
                </Typography>
                <Typography gutterBottom>{t('Question')}</Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  style={{ width: '300px' }}
                >
                  {t(
                    'Enter the question text that will be displayed to the user.'
                  )}
                </Typography>
                <STextField
                  name="text"
                  placeholder={`${t('Question here')}...`}
                />
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {t('Start typing   {   to insert a variable.')}
                </Typography>

                <Typography>{t('Replies')}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {t('Define the choices presented to the user.')}
                </Typography>
                <MuiBox display="flex" flexDirection="column">
                  {initialValues.children.map((item, index) => (
                    <SReplyField
                      key={item.id}
                      name={`children[${index}].value.text`}
                      placeholder={`${t('Reply title')}...`}
                    />
                  ))}
                </MuiBox>

                <Button
                  onClick={handleSubmit}
                  title={t('Save')}
                  style={{ alignSelf: 'center' }}
                />
              </div>
            </MuiBox>
          </form>
        );
      }}
    />
  );
}

const getInitialValues = (props) => {
  const { children, text } = !!props && props;
  let replies = {};

  if (children && children.length !== 0) {
    replies = children;
  } else {
    replies = [
      {
        id: shortid.generate(),
        value: {
          text: null,
          type: vertexTypes.choices,
        },
        offsetX: -200,
        offsetY: 50,
        width: 100,
        height: 50,
      },
      {
        id: shortid.generate(),
        value: {
          text: null,
          type: vertexTypes.choices,
        },
        offsetX: 100,
        offsetY: 50,
        width: 100,
        height: 50,
      },
    ];
  }

  return {
    children: replies,
    text,
  };
};

export default EditQuickReply;
