import React from 'react';
import * as Yup from 'yup';
import { Button as MuiButton } from '@material-ui/core';
import { makeValidate } from 'mui-rff';

import { FormControl, Icon, DatePicker } from 'components/ui';
import FormDialog from 'components/Dialogs/FormDialog';
import FormAutocomplete from '../FormAutocomplete';
import { useGetList } from '../../../pages/CarePlans/_service/hooks/useGetList';
import { GqlCarePlanType } from '../../../generated/graphql';
import { useTranslation } from 'react-i18next';

const schema = Yup.object().shape({
  protocol: Yup.string().required('Required field'),
});

const validate = makeValidate(schema);

function AddCarePlanDialog(props: Props) {
  const { close } = props;
  const { data } = useGetList(GqlCarePlanType.Workspace, 0, 1000)
  const { t } = useTranslation();

  const initialValues: FormValues = {
    protocol: ''
  };
  const onSave = (values: FormValues) => {
    close(values);
  };

  const actions = [
    <MuiButton key="save" type="submit" color="primary" variant="contained">
      <Icon icon="file" size="1x" mr={10} /> {t('Save')}
    </MuiButton>,
  ];

  return (
    // @ts-ignore
    <FormDialog
      title={t('Add protocol')}
      onSubmit={onSave}
      initialValues={initialValues}
      validate={validate}
      actions={actions}
      onClose={close}
      {...props}
    >
      {() => {
        return (
          <div>
            <FormControl>
              <FormAutocomplete
                name="protocol"
                placeholder={t('Choose protocol')}
                // @ts-ignore
                getOptionLabel={(i) => i?.name}
                // @ts-ignore
                getOptionValue={(i) => i?.id_}
                options={data?.carePlan?.list?.items || []}
              />
            </FormControl>

            <FormControl label={t('Publication date')}>
              <DatePicker
                name="publicationDate"
                id="version-publish-date"
                placeholder="dd/mm/yyyy"
                format="dd/mm/yyyy"
                openTo="date"
                variant="inline"
                disableFuture={false}
                KeyboardButtonProps={{
                  'aria-label': 'change publication date',
                }}
                inputVariant="outlined"
              />
        </FormControl>
          </div>
        );
      }}
    </FormDialog>
  );
}

export default AddCarePlanDialog;

interface Props {
  close: (values: FormValues) => void
  isOpen: boolean
}

interface FormValues {
  protocol: string
}
