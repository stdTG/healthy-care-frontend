import React, { memo, useState } from 'react';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-final-form';
import { useParams } from 'react-router-dom';

import Card from './Card';
import {
  actions as patientRecordActions,
  selectors as patientRecordSelectors,
} from 'services/patientRecord';
import { FormControl, FormTextField, Icon, IconButton } from 'components/ui';
import AddButton from 'components/Buttons/AddButton';
import { useUpdate_FamilyMutation } from './../../generated/graphql';
import { useTranslation } from 'react-i18next';

const CardFamily = memo(function CardFamily(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const family = useSelector(patientRecordSelectors.getFamily);
  const [isEditMode, setEditMode] = useState(false);

  const [updateFamily, { loading }] = useUpdate_FamilyMutation();
  const { t } = useTranslation();

  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const onAdd = async (values) => {
    const response = await updateFamily({
      variables: {
        patient: id,
        record: {
          ...values,
        },
      },
    });

    if (response?.data?.user?.patientUser.updateFamily.ok) {
      dispatch(
        patientRecordActions.setFamily(
          response?.data?.user?.patientUser?.updateFamily?.result
        )
      );
    }

    toggleEditMode();
  };

  const getTitleIcon = (props) => <Icon icon="users" {...props} />;

  const Info = ({ title, value }) => {
    const { t } = useTranslation();
    return (
      <MuiBox mb={2} style={{ width: '100%', wordBreak: 'break-word' }}>
        <MuiTypography variant="h6" color="textSecondary">
          {title}
        </MuiTypography>
        {!value ? (
          <MuiTypography variant="subtitle2" color="textSecondary">
            {t('Empty')}
          </MuiTypography>
        ) : (
          <MuiTypography variant="h5">{value}</MuiTypography>
        )}
      </MuiBox>
    );
  };

  return (
    <Card
      title={t('Family background')}
      getTitleIcon={getTitleIcon}
      EditButton={
        <IconButton
          icon={isEditMode ? 'check' : 'pen'}
          onClick={toggleEditMode}
        />
      }
    >
      {isEditMode ? (
        <Form
          onSubmit={onAdd}
          initialValues={family}
          render={({ values, handleSubmit, invalid }) => {
            return (
              <form>
                <FormControl label={t('Mother')}>
                  <FormTextField
                    name="mother"
                    placeholder={t('Enter information')}
                    multiline
                    minHeight={80}
                  />
                </FormControl>
                <FormControl label={t('Father')}>
                  <FormTextField
                    name="father"
                    placeholder={t('Enter information')}
                    multiline
                    minHeight={80}
                  />
                </FormControl>
                <FormControl label={t('Grand parents')}>
                  <FormTextField
                    name="grandparents"
                    placeholder={t('Enter information')}
                    multiline
                    minHeight={80}
                  />
                </FormControl>
                <MuiBox display="flex" justifyContent="flex-end">
                  <AddButton
                    onClick={handleSubmit}
                    disabled={invalid || loading}
                    title={t('Save change')}
                    type="submit"
                    loading={loading}
                  />
                </MuiBox>
              </form>
            );
          }}
        />
      ) : (
        <>
          <Info title={t('Mother')} value={family?.mother} />
          <Info title={t('Father')} value={family?.father} />
          <Info title={t('Grand parents')} value={family?.grandparents} />
        </>
      )}
    </Card>
  );
});

export default CardFamily;
