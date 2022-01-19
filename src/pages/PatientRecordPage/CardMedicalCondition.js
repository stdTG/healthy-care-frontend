import React, { memo, useContext, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { format, formatISO, parseISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Checkboxes as RffCheckboxes, makeValidate } from 'mui-rff';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';
import {
  DatePicker,
  FormControl,
  FormTextField,
  Icon,
  IconButton,
} from 'components/ui';
import AddButton from 'components/Buttons/AddButton';
import { schema } from './validation/cardMedicalCondition';
import Card from './Card';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_MEDICAL_CONDITIONS } from 'pages/PatientRecordPage/gqlSchemes/getMedicalConditions';
import { CREATE_MEDICAL_CONDITION } from 'pages/PatientRecordPage/gqlSchemes/createMedicalCondition';
import { countDuration, dateTypes, dateTypesData } from 'lib/utils/countAge';
import { DELETE_MEDICAL_CONDITION } from 'pages/PatientRecordPage/gqlSchemes/deleteMedicalCondition';
import { UPDATE_MEDICAL_CONDITION } from 'pages/PatientRecordPage/gqlSchemes/updateMedicalCondition';
import SContentWrap from 'pages/PatientRecordPage/styled/SContentWrap';
import LoadMore from 'pages/PatientRecordPage/LoadMore';
import CardPopover from 'pages/PatientRecordPage/CardPopover';
import { useTranslation } from 'react-i18next';

import { getCorrespondingFakeDataFromFakePatient } from 'lib/fakeData/fakePatientData';

const validate = makeValidate(schema);
const currentDate = new Date();

const MedicalConditionForm = ({
  isCreateMode,
  item,
  onCreate,
  onEdit,
  loading,
}) => {
  const initialValues = {
    isRecovered: false,
    startDate: currentDate,
    endDate: currentDate,
    name: '',
  };
  const { t } = useTranslation();

  return (
    <Form
      onSubmit={isCreateMode ? onCreate : onEdit}
      initialValues={
        isCreateMode
          ? initialValues
          : {
              ...item,
              endDate: item.endDate ? item.endDate : currentDate,
            }
      }
      validate={validate}
      render={({ values, handleSubmit, invalid, form }) => {
        return (
          <form>
            <MuiBox mb={2}>
              <MuiTypography variant="h5">
                {isCreateMode ? t('Create') : t('Edit')}{' '}
                {t('a medical condition')}
              </MuiTypography>
            </MuiBox>
            <FormControl>
              <FormTextField name="name" placeholder={`${t('Title')}...`} />
            </FormControl>
            <FormControl>
              <DatePicker
                name="startDate"
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

              <RffCheckboxes
                name="isRecovered"
                size="small"
                style={{ margin: '10px 0' }}
                data={[
                  {
                    label: t('Not suffering this anymore'),
                    value: true,
                  },
                ]}
              />

              {values.isRecovered && (
                <DatePicker
                  name="endDate"
                  id="date-picker-dialog"
                  placeholder={`${t('Ended on')}...`}
                  format="dd/MM/yyyy"
                  openTo="year"
                  variant="inline"
                  disableFuture={true}
                  KeyboardButtonProps={{
                    'aria-label': 'change date of start',
                  }}
                  inputVariant="outlined"
                />
              )}
            </FormControl>
            <MuiBox display="flex" justifyContent="flex-end">
              <AddButton
                onClick={handleSubmit}
                disabled={loading || invalid}
                title={
                  isCreateMode
                    ? t('Create medical condition')
                    : t('Save change')
                }
                type="submit"
                loading={loading}
              />
            </MuiBox>
          </form>
        );
      }}
    />
  );
};

const CardMedicalCondition = memo(function CardMedicalCondition(props) {
  const { id } = useParams();
  var [medicalConditions, setMedicalConditions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({});
  const [isCreateMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState({
    id: '',
    isEditMode: false,
  });

  const currentMedicalCondition = getCorrespondingFakeDataFromFakePatient(
    id,
    'medicalCondition'
  );
  var medicalConditions = currentMedicalCondition;

  const { t } = useTranslation();

  const [getMedicalConditions, { error, data, loading }] = useLazyQuery(
    GET_MEDICAL_CONDITIONS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        patient: id,
        page: currentPage,
        perPage: 2,
      },
    }
  );

  const [
    createMedicalCondition,
    { loading: loadingMedicalCondition, data: medicalConditionData },
  ] = useMutation(CREATE_MEDICAL_CONDITION);

  const [
    deleteMedicalCondition,
    {
      loading: loadingDeleteMedicalCondition,
      data: deleteMedicalConditionData,
    },
  ] = useMutation(DELETE_MEDICAL_CONDITION);

  const [
    updateMedicalCondition,
    {
      loading: loadingUpdateMedicalCondition,
      data: updateMedicalConditionData,
    },
  ] = useMutation(UPDATE_MEDICAL_CONDITION);

  useEffect(() => {
    getMedicalConditions();
  }, []);

  useEffect(() => {
    setMedicalConditions([
      ...medicalConditions,
      ...(data?.patientInfo?.medicalCondition?.pagination?.items || []),
    ]);
    setPageInfo(data?.patientInfo?.medicalCondition?.pagination?.pageInfo);
  }, [data]);

  const toggleCreateMode = () => {
    setCreateMode(!isCreateMode);
  };

  const getTitleIcon = (props) => <Icon icon="heartbeat" {...props} />;

  const onCreate = async (values) => {
    const response = await createMedicalCondition({
      variables: {
        record: {
          patient: id,
          name: values.name,
          startDate:
            typeof values.startDate === 'string'
              ? values.startDate
              : formatISO(values?.startDate, { representation: 'date' }),
          endDate: values.isRecovered
            ? formatISO(values?.endDate, { representation: 'date' })
            : null,
        },
      },
    });

    if (response?.data?.patientInfo?.medicalCondition?.create.ok) {
      setMedicalConditions([
        response?.data?.patientInfo?.medicalCondition?.create?.result,
        ...medicalConditions,
      ]);
    }
  };

  const onDelete = async (id) => {
    const response = await deleteMedicalCondition({
      variables: {
        id_: id,
      },
    });

    if (response?.data?.patientInfo?.medicalCondition?.delete.ok) {
      setMedicalConditions(
        medicalConditions.filter((condition) => condition.id_ !== id)
      );
    }
  };

  const onEdit = async (values) => {
    const response = await updateMedicalCondition({
      variables: {
        id_: values.id_,
        record: {
          name: values.name,
          startDate:
            typeof values.startDate === 'string'
              ? values.startDate
              : formatISO(values?.startDate, { representation: 'date' }),
          endDate: values.isRecovered
            ? formatISO(values?.endDate, { representation: 'date' })
            : null,
        },
      },
    });

    if (response?.data?.patientInfo?.medicalCondition?.update.ok) {
      setMedicalConditions([
        response?.data?.patientInfo?.medicalCondition?.update?.result,
        ...medicalConditions.filter(
          (condition) => condition.id_ !== values.id_
        ),
      ]);

      toggleEditMode(values.id_, false);
    }
  };

  const Event = ({ item }) => {
    const { period, type } = countDuration(
      parseISO(item.startDate),
      item.endDate ? parseISO(item.endDate) : new Date()
    );

    return (
      <MuiBox key={item.id_}>
        <MuiBox
          justifyContent="space-between"
          alignItems="center"
          display="flex"
          key={item.id_}
          my={2}
        >
          <SContentWrap>
            <MuiBox>
              {!item.endDate && (
                <div>
                  <MuiTypography variant="h5">{item.name}</MuiTypography>
                  <MuiTypography variant="subtitle1" color="textSecondary">
                    Since {format(parseISO(item.startDate), 'MMMM dd yyyy')}
                    <span style={{ margin: '5px' }}>&sdot;</span>
                    {type !== dateTypes.new ? period : ''}{' '}
                    {dateTypesData[type].title} ago
                  </MuiTypography>
                </div>
              )}

              {item.endDate && (
                <div>
                  <MuiTypography variant="h5" color="textSecondary">
                    {item.name}
                  </MuiTypography>
                  <MuiTypography variant="subtitle1" color="textSecondary">
                    From {format(parseISO(item.startDate), 'MMMM dd yyyy')}
                    <span style={{ margin: '5px' }}>&sdot;</span>
                    To {format(parseISO(item.endDate), 'MMMM dd yyyy')}
                  </MuiTypography>
                </div>
              )}
            </MuiBox>

            <CardPopover
              id={item.id_}
              onDelete={onDelete}
              toggleEditMode={toggleEditMode}
              deleteDialogTitle={t('Delete medical condition')}
              deleteDialogMessage={t('Do you want delete medical condition?')}
            />
          </SContentWrap>
        </MuiBox>
      </MuiBox>
    );
  };

  const hasPreviousDiseases = () => {
    return medicalConditions.some((condition) => condition.endDate);
  };

  const loadMore = () => {
    getMedicalConditions({
      variables: {
        page: currentPage + 1,
        perPage: 2,
      },
    });
    setCurrentPage(currentPage + 1);
  };

  const toggleEditMode = (id, isEditMode) => {
    setEditMode({
      id,
      isEditMode,
    });
  };

  return (
    <Card
      title={t('Medical condition')}
      getTitleIcon={getTitleIcon}
      EditButton={
        <IconButton
          icon={isCreateMode ? 'check' : 'plus'}
          onClick={toggleCreateMode}
        />
      }
    >
      {isCreateMode && (
        <MedicalConditionForm
          isCreateMode={isCreateMode}
          onCreate={onCreate}
          loading={loadingMedicalCondition}
        />
      )}

      {medicalConditions.length === 0 ? (
        <MuiTypography variant="h5" color="textSecondary">
          {t('No medical conditions')}
        </MuiTypography>
      ) : (
        <div>
          {medicalConditions?.map(({ id_, name, startDate, endDate }) => {
            if (editMode.isEditMode && id_ === editMode.id && !endDate) {
              return (
                <MedicalConditionForm
                  key={id_}
                  isCreateMode={false}
                  onEdit={onEdit}
                  loading={loadingUpdateMedicalCondition}
                  item={{
                    id_,
                    name,
                    startDate,
                    endDate,
                  }}
                />
              );
            }

            return (
              !endDate && (
                <Event
                  key={id_}
                  item={{
                    id_,
                    name,
                    startDate,
                    endDate,
                  }}
                />
              )
            );
          })}

          {hasPreviousDiseases() && (
            <MuiTypography variant="h5" color="textSecondary">
              {t('PREVIOUS')}
            </MuiTypography>
          )}

          {medicalConditions?.map(({ id_, name, startDate, endDate }) => {
            if (editMode.isEditMode && id_ === editMode.id && endDate) {
              return (
                <MedicalConditionForm
                  isCreateMode={false}
                  onEdit={onEdit}
                  key={id_}
                  loading={loadingUpdateMedicalCondition}
                  item={{
                    id_,
                    name,
                    startDate,
                    endDate,
                  }}
                />
              );
            }

            return (
              endDate && (
                <Event
                  key={id_}
                  item={{
                    id_,
                    name,
                    startDate,
                    endDate,
                  }}
                />
              )
            );
          })}
        </div>
      )}

      <LoadMore
        loading={loading}
        pageInfo={pageInfo}
        currentPage={currentPage}
        onLoadMore={loadMore}
      />
    </Card>
  );
});

export default CardMedicalCondition;
