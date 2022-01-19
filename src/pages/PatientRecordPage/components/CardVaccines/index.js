import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, formatISO, parseISO } from 'date-fns';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';

import { countAge } from 'lib/utils';
import {
  actions as patientRecordActions,
  selectors as patientRecordSelectors,
} from 'services/patientRecord';
import { Icon, IconButton } from 'components/ui';
import Card from '../../../PatientRecordPage/Card';

import { useParams } from 'react-router-dom';
import CardPopover from 'pages/PatientRecordPage/CardPopover';
import SContentWrap from 'pages/PatientRecordPage/styled/SContentWrap';
import VaccineForm from '../CardVaccines/VaccineForm';
import {
  useAdd_VaccineMutation,
  useDelete_VaccineMutation,
  useUpdate_VaccineMutation,
} from '../../../../generated/graphql';
import { useTranslation } from 'react-i18next';

const CardVaccines = memo(function CardVaccines() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isCreateMode, setCreateMode] = useState(false);
  const vaccines = useSelector(patientRecordSelectors.getVaccines);
  const [editMode, setEditMode] = useState({
    id: '',
    isEditMode: false,
  });

  const [addVaccine, { loading: addVaccineLoading }] = useAdd_VaccineMutation();

  const [deleteVaccine] = useDelete_VaccineMutation();
  const { t } = useTranslation();

  const [
    updateVaccine,
    { loading: updateVaccineLoading },
  ] = useUpdate_VaccineMutation();

  const toggleEditMode = (id, isEditMode) => {
    setEditMode({
      id,
      isEditMode,
    });
  };

  const toggleCreateMode = () => {
    setCreateMode(!isCreateMode);
  };

  const onAdd = async (values) => {
    const response = await addVaccine({
      variables: {
        patient: id,
        record: {
          name: values.name,
          date: formatISO(values?.date, { representation: 'date' }),
        },
      },
    });

    if (response?.data?.user?.patientUser?.vaccine?.add.ok) {
      dispatch(
        patientRecordActions.setVaccines({
          vaccines: [
            response?.data?.user?.patientUser?.vaccine?.add?.result,
            ...vaccines,
          ],
        })
      );

      setCreateMode(false);
    }
  };

  const onDelete = async (vaccineId) => {
    const response = await deleteVaccine({
      variables: {
        patient: id,
        vaccineUuid: vaccineId,
      },
    });

    if (response?.data?.user?.patientUser?.vaccine?.delete.ok) {
      dispatch(
        patientRecordActions.setVaccines({
          vaccines: vaccines.filter((vaccine) => vaccine.uuid !== vaccineId),
        })
      );
    }
  };

  const onEdit = async (values) => {
    const response = await updateVaccine({
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

    if (response?.data?.user?.patientUser?.vaccine?.update.ok) {
      dispatch(
        patientRecordActions.setVaccines({
          vaccines: [
            response?.data?.user?.patientUser?.vaccine?.update?.result,
            ...vaccines.filter((vaccine) => vaccine.uuid !== values.uuid),
          ],
        })
      );

      toggleEditMode(values.uuid, false);
    }
  };

  const getTitleIcon = (props) => <Icon icon="syringe" {...props} />;

  return (
    <Card
      title={t('Vaccines')}
      getTitleIcon={getTitleIcon}
      EditButton={
        <IconButton
          icon={isCreateMode ? 'check' : 'plus'}
          onClick={toggleCreateMode}
        />
      }
    >
      {isCreateMode && (
        <VaccineForm
          isCreateMode={true}
          onAdd={onAdd}
          loading={addVaccineLoading}
        />
      )}

      {vaccines.length === 0 ? (
        <MuiTypography variant="h5" color="textSecondary">
          {t('No vaccines')}
        </MuiTypography>
      ) : (
        vaccines?.map(({ uuid, name, date }) => {
          if (editMode.isEditMode && uuid === editMode.id) {
            return (
              <VaccineForm
                isCreateMode={false}
                onEdit={onEdit}
                loading={updateVaccineLoading}
                values={{
                  uuid,
                  name,
                  date,
                }}
              />
            );
          }

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
                    <MuiTypography variant="h5">{name}</MuiTypography>
                    <MuiTypography variant="subtitle1" color="textSecondary">
                      Since {format(parseISO(date), 'MMMM dd yyyy')}
                      <span style={{ margin: '5px' }}>&sdot;</span>
                      {countAge(date)}
                    </MuiTypography>
                  </MuiBox>
                  <CardPopover
                    id={uuid}
                    onDelete={onDelete}
                    toggleEditMode={toggleEditMode}
                    deleteDialogTitle={t('Delete vaccine')}
                    deleteDialogMessage={t('Do you want delete vaccine?')}
                  />
                </SContentWrap>
              </MuiBox>
            </MuiBox>
          );
        })
      )}
    </Card>
  );
});

export default CardVaccines;
