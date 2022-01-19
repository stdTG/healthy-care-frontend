import React from 'react';
import { Form } from 'react-final-form';
import { Box as MuiBox } from '@material-ui/core';
import { values } from 'ramda';
import { TextField as RffTextField } from 'mui-rff';

import { Icon, Typography } from 'components/ui';
import STextField from '../styled/STextField';
import { Button } from 'components';
import {
  AC,
  SFormControl,
} from 'pages/CarePlans/Builder/TabBuild/styled/question';
import { actionCategoriesData } from 'lib/enums/actionCategories';
import { useTranslation } from 'react-i18next';

function EditText(props) {
  const { onSave, initialValues } = props;
  const { t } = useTranslation();

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
                {t('Action setting')}
              </Typography>
              <MuiBox mb={2}>
                <Typography>{t('Select the category')}</Typography>
                <AC
                  name="prefix"
                  placeholder={t('Category')}
                  options={values(actionCategoriesData)}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                />
              </MuiBox>
              <MuiBox mb={2}>
                <Typography>{t('Description')}</Typography>
                <STextField
                  name="description"
                  placeholder={t(
                    'Describe the action you want your audience to perform with number of sets, duration, pause, intensity (Example: Perform pushups)'
                  )}
                  style={{ width: '350px' }}
                />
              </MuiBox>
              <MuiBox mb={2}>
                <Typography>{t('Tips')}</Typography>
                <STextField
                  name="tips"
                  placeholder={t(
                    'Describe usefulness of the action and/or tips to perform it well.'
                  )}
                  style={{ width: '350px' }}
                />
              </MuiBox>

              <MuiBox mb={2}>
                <SFormControl label={() => <Icon icon="media" />}>
                  <RffTextField
                    name="media"
                    autoComplete="off"
                    placeholder={t('Paste a video from YouTube or Vimeo')}
                    variant="outlined"
                    size="small"
                  />
                </SFormControl>
                <Typography>{t('OR')}</Typography>
                <RffTextField
                  name="image"
                  autoComplete="off"
                  placeholder={t('Upload an image (PNG, JPEG)')}
                  variant="outlined"
                  size="small"
                />
              </MuiBox>

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
