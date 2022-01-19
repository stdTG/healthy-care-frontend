import React from 'react';
import { Field, Form, useForm } from 'react-final-form';
import { makeValidate } from 'mui-rff';
import { FormControl } from 'components/ui';
import FormTextField from 'components/ui/FormTextField';
import FormFileUploader from 'components/ui/FormFileUploader';
import Grid from '@material-ui/core/Grid';

import { schema } from '../validation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/reducer';

import { useCreate } from 'pages/CarePlans/_service/hooks/useCreate';
import { useUpdate } from 'pages/CarePlans/_service/hooks/useUpdate';
import { CarePlan } from '../../../models';
import { useSaveHandler } from '../../useSaveHandler';

import { TagsField } from './components/TagsField';
import { Line } from './components/Line';
import { tagOptions } from 'lib/enums/tagOptions';
import { useTranslation } from 'react-i18next';


function CarePlanForm (props: Props) {
  const form = useForm();
  const { t } = useTranslation();

  useSaveHandler(form);

  const initTagList = useSelector( (state:any) => state.carePlans && state.carePlans.builder.currentCarePlan.tags )

  return (
    <div style={{width: '50%'}}>
      <FormControl label={t('Protocol name')}>
        <FormTextField name="name" placeholder={t('Protocol name')} autoFocus={true} />
      </FormControl>

      <FormControl label={t('Protocol subtitle')}>
        <FormTextField name="subtitle" placeholder={t('Protocol subtitle')} />
      </FormControl>

      <div>
        <FormControl label={t('Choose an image')}>
          <FormFileUploader
            withTitle={t('FileName')}
            name="image"
            style={{
              maxWidth: '200px',
              height: 'auto',
              minHeight: '50px'
            }}
          />
        </FormControl>
      </div>

      <Line />

      <FormControl label={t('Description')}>
        <FormTextField
          name="description"
          placeholder={t('Description')}
          multiline
          $minHeight={100}
        />
      </FormControl>

      <Line />

      <FormControl label={t('Duration')}>
        <Grid container direction="row">
          <Grid item xs={2} style={{marginRight: '16px'}}>
            <FormTextField name="durationMonths" label={t('Months')} placeholder={t('Months')} />
          </Grid>
          <Grid item xs={2} style={{marginRight: '16px'}}>
            <FormTextField name="durationWeeks" label={t('Weeks')} placeholder={t('Weeks')} />
          </Grid>
          <Grid item xs={2}>
            <FormTextField name="durationDays" label={t('Days')} placeholder={t('Days')} />
          </Grid>
        </Grid>
      </FormControl>

      <Line />

      <TagsField form={form} initTags={initTagList} options={tagOptions} />

    </div>
  );
};

export default CarePlanForm;

interface Props {
}
