import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format, formatISO, getTime, parseISO } from 'date-fns';
import { Form } from 'react-final-form';
import { makeValidate } from 'mui-rff';
import { Typography as MuiTypography, Box as MuiBox } from '@material-ui/core';

import Card from './Card';
import {
  FormTextField,
  FormControl,
  IconButton,
  DatePicker,
  Icon,
} from 'components/ui';
import AddButton from 'components/Buttons/AddButton';
import {
  actions as patientRecordActions,
  selectors as patientRecordSelectors,
} from 'services/patientRecord';

import { countAge } from 'lib/utils';
import { schema } from 'pages/PatientRecordPage/validation/cardAllergies';
import CardPopover from 'pages/PatientRecordPage/CardPopover';
import SContentWrap from 'pages/PatientRecordPage/styled/SContentWrap';
import {
  useAdd_AllergyMutation,
  useDelete_AllergyMutation,
  useUpdate_AllergyMutation,
} from '../../generated/graphql';
import AllergiesModal from './AllergiesModal';
import { useTranslation } from 'react-i18next';

const validate = makeValidate(schema);

const AllergiesForm = ({ isCreateMode, onAdd, onEdit, values, loading }) => {
  const { t } = useTranslation();

  const initialValues = {
    name: null,
    date: new Date(),
  };

  return (
    <Form
      onSubmit={isCreateMode ? onAdd : onEdit}
      initialValues={isCreateMode ? initialValues : { ...values }}
      validate={validate}
      render={({ handleSubmit, invalid }) => (
        <form>
          <MuiBox mb={2}>
            <MuiTypography variant="h5">
              {isCreateMode ? t('Add an allergy') : t('Edit an allergy')}
            </MuiTypography>
          </MuiBox>
          <FormControl>
            <FormTextField name="name" placeholder={`${t('Name')}...`} />
          </FormControl>
          <FormControl>
            <DatePicker
              name="date"
              id="date-picker-dialog"
              placeholder={t('Started on')}
              format="dd/MM/yyyy"
              openTo="year"
              variant="inline"
              disableFuture={true}
              KeyboardButtonProps={{
                'aria-label': 'change date of start',
              }}
              inputVariant="outlined"
            />
          </FormControl>

          <MuiBox display="flex" justifyContent="flex-end">
            <AddButton
              onClick={handleSubmit}
              disabled={loading || invalid}
              title={isCreateMode ? t('Add allergy') : t('Save changes')}
              type="submit"
              loading={loading}
            />
          </MuiBox>
        </form>
      )}
    />
  );
};

const CardAllergies = memo(function CardAllergies() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isCreateMode, setCreateMode] = useState(false);
  const allergies = useSelector(patientRecordSelectors.getAllergies);
  const [editMode, setEditMode] = useState({
    id: '',
    isEditMode: false,
  });
  const [open, setOpen] = useState(false);

  const [addAllergy, { loading: addAllergyLoading }] = useAdd_AllergyMutation();

  const [deleteAllergy] = useDelete_AllergyMutation();
  const { t } = useTranslation();

  const [
    updateAllergy,
    { loading: updateAllergyLoading },
  ] = useUpdate_AllergyMutation();

  const toggleEditMode = (id, isEditMode) => {
    setEditMode({
      id,
      isEditMode,
    });
  };

  const toggleCreateMode = () => {
    // setCreateMode(!isCreateMode);
    setOpen(!open);
  };

  const onAdd = async (values) => {
    const response = await addAllergy({
      variables: {
        patient: id,
        record: {
          name: values.name,
          date: formatISO(values?.date, { representation: 'date' }),
        },
      },
    });

    if (response?.data?.user?.patientUser?.allergy?.add.ok) {
      dispatch(
        patientRecordActions.setAllergies({
          allergies: [
            response?.data?.user?.patientUser?.allergy?.add?.result,
            ...allergies,
          ],
        })
      );
      setCreateMode(false);
    }
  };

  const onDelete = async (allergyId) => {
    const response = await deleteAllergy({
      variables: {
        patient: id,
        allergyUuid: allergyId,
      },
    });

    if (response?.data?.user?.patientUser?.allergy?.delete.ok) {
      dispatch(
        patientRecordActions.setAllergies({
          allergies: allergies.filter((allergy) => allergy.uuid !== allergyId),
        })
      );
    }
  };

  const onEdit = async (values) => {
    const response = await updateAllergy({
      variables: {
        patient: id,
        record: {
          ...values,
          date:
            typeof values.date === 'string'
              ? values.date
              : formatISO(values?.date, { representation: 'date' }),
        },
      },
    });

    if (response?.data?.user?.patientUser?.allergy?.update.ok) {
      dispatch(
        patientRecordActions.setAllergies({
          allergies: [
            response?.data?.user?.patientUser?.allergy?.update?.result,
            ...allergies.filter((allergy) => allergy.uuid !== values.uuid),
          ],
        })
      );

      toggleEditMode(values.uuid, false);
    }
  };

  const getTitleIcon = (props) => <Icon icon="head-side-cough" {...props} />;

  return (
    <Card
      title={t('Allergies')}
      getTitleIcon={getTitleIcon}
      EditButton={
        <IconButton
          icon={isCreateMode ? 'check' : 'plus'}
          onClick={toggleCreateMode}
        />
      }
    >
      {isCreateMode && (
        <AllergiesForm
          isCreateMode={true}
          onAdd={onAdd}
          loading={addAllergyLoading}
        />
      )}

      {allergies.length === 0 ? (
        <MuiTypography variant="h5" color="textSecondary">
          {t('No allergy')}
        </MuiTypography>
      ) : (
        // allergies.map(({ uuid, name, date }) => {
        //   if (editMode.isEditMode && uuid === editMode.id) {
        //     return (
        //       <AllergiesForm
        //         isCreateMode={false}
        //         onEdit={onEdit}
        //         loading={updateAllergyLoading}
        //         values={{
        //           uuid,
        //           name,
        //           date,
        //         }}
        //       />
        //     );
        //   }
        allergies.map(
          ({
            uuid,
            category,
            substance,
            reactionTask,
            severity,
            certainty,
            comment,
          }) => {
            return (
              <MuiBox key={uuid}>
                <MuiBox
                  justifyContent="space-between"
                  alignItems="center"
                  display="flex"
                  key={uuid}
                  my={2}
                >
                  <SContentWrap>
                    <MuiBox>
                      <MuiTypography variant="h5">{substance}</MuiTypography>

                      <MuiTypography variant="h5" color="textSecondary">
                        {reactionTask} | {severity}
                      </MuiTypography>

                      {/* <MuiTypography variant="subtitle1" color="textSecondary">
                      Since {format(parseISO(date), 'MMMM dd yyyy')}
                      <span style={{ margin: '5px' }}>&sdot;</span>
                      {countAge(date)}
                    </MuiTypography> */}
                    </MuiBox>
                    <CardPopover
                      id={uuid}
                      onDelete={onDelete}
                      toggleEditMode={toggleEditMode}
                      deleteDialogTitle={t('Delete allergy')}
                      deleteDialogMessage={t('Do you want delete allergy?')}
                    />
                  </SContentWrap>
                </MuiBox>
              </MuiBox>
            );
          }
        )
      )}
      <AllergiesModal open={open} onClose={() => setOpen(false)} />
    </Card>
  );
});

export default CardAllergies;
