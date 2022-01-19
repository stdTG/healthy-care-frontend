import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from 'react-final-form';
import { makeValidate } from 'mui-rff';
import { format, formatISO, parseISO } from 'date-fns';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';

import {
  DatePicker,
  FormControl,
  FormTextField,
  Icon,
  IconButton,
} from 'components/ui';
import AddButton from 'components/Buttons/AddButton';
import { countDuration, dateTypes, dateTypesData } from 'lib/utils/countAge';
import { schema } from './validation/cardMedicalHistory';
import Card from './Card';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_MEDICAL_HISTORY } from 'pages/PatientRecordPage/gqlSchemes/getMedicalHistory';
import { CREATE_MEDICAL_HISTORY } from 'pages/PatientRecordPage/gqlSchemes/createMedicalHistory';
import SContentWrap from 'pages/PatientRecordPage/styled/SContentWrap';
import { DELETE_MEDICAL_HISTORY } from 'pages/PatientRecordPage/gqlSchemes/deleteMedicalHistory';
import LoadMore from 'pages/PatientRecordPage/LoadMore';
import { UPDATE_MEDICAL_HISTORY } from 'pages/PatientRecordPage/gqlSchemes/updateMedicalHistory';
import CardPopover from 'pages/PatientRecordPage/CardPopover';
import { useTranslation } from 'react-i18next';

import { getCorrespondingFakeDataFromFakePatient } from 'lib/fakeData/fakePatientData';

const validate = makeValidate(schema);
const currentDate = new Date();

const MedicalHistoryForm = ({
  isCreateMode,
  item,
  onCreate,
  onEdit,
  loading,
}) => {
  const initialValues = {
    name: '',
    comment: '',
    date: currentDate,
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
              date: item.date ? item.date : currentDate,
            }
      }
      validate={validate}
      render={({ values, handleSubmit, invalid }) => {
        return (
          <form>
            <MuiBox mb={2}>
              <MuiTypography variant="h5">
                {isCreateMode
                  ? t('Create a medical history')
                  : t('Edit medical history')}
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
            <FormControl>
              <FormTextField
                multiline
                name="comment"
                placeholder={`${t('Comment')}...`}
              />
            </FormControl>

            <MuiBox display="flex" justifyContent="flex-end">
              <AddButton
                onClick={handleSubmit}
                disabled={invalid || loading}
                style={{ marginBottom: '20px' }}
                title={
                  isCreateMode
                    ? t('Create a medical history')
                    : t('Save changes')
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

const CardMedicalHistory = memo(function CardMedicalHistory(props) {
  const { id } = useParams();
  var [medicalHistory, setMedicalHistory] = useState([]);

  medicalHistory = getCorrespondingFakeDataFromFakePatient(
    id,
    'medicalHistory'
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({});
  const [isCreateMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState({
    id: '',
    isEditMode: false,
  });

  const { t } = useTranslation();

  const [getMedicalHistory, { error, data, loading }] = useLazyQuery(
    GET_MEDICAL_HISTORY,
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
    createMedicalHistory,
    { loading: loadingMedicalHistory, data: medicalHistoryData },
  ] = useMutation(CREATE_MEDICAL_HISTORY);

  const [
    deleteMedicalHistory,
    { loading: loadingDeleteMedicalHistory, data: deleteMedicalHistoryData },
  ] = useMutation(DELETE_MEDICAL_HISTORY);

  const [
    updateMedicalHistory,
    { loading: loadingUpdateMedicalHistory, data: updateMedicalHistoryData },
  ] = useMutation(UPDATE_MEDICAL_HISTORY);

  useEffect(() => {
    getMedicalHistory();
  }, []);

  useEffect(() => {
    setMedicalHistory([
      ...medicalHistory,
      ...(data?.patientInfo?.medicalHistory?.pagination?.items || []),
    ]);
    setPageInfo(data?.patientInfo?.medicalHistory?.pagination?.pageInfo);
  }, [data]);

  const toggleCreateMode = () => {
    setCreateMode(!isCreateMode);
  };

  const toggleEditMode = (id, isEditMode) => {
    setEditMode({
      id,
      isEditMode,
    });
  };

  const loadMore = () => {
    getMedicalHistory({
      variables: {
        page: currentPage + 1,
        perPage: 2,
      },
    });
    setCurrentPage(currentPage + 1);
  };

  const getTitleIcon = (props) => <Icon icon="heartbeat" {...props} />;

  const onCreate = async (values) => {
    const response = await createMedicalHistory({
      variables: {
        record: {
          patient: id,
          name: values.name,
          comment: values.comment,
          date:
            typeof values.date === 'string'
              ? values.date
              : formatISO(values?.date, { representation: 'date' }),
        },
      },
    });

    if (response?.data?.patientInfo?.medicalHistory?.create.ok) {
      setMedicalHistory([
        response?.data?.patientInfo?.medicalHistory?.create?.result,
        ...medicalHistory,
      ]);
    }
  };

  const onDelete = async (id) => {
    const response = await deleteMedicalHistory({
      variables: {
        id_: id,
      },
    });

    if (response?.data?.patientInfo?.medicalHistory?.delete.ok) {
      setMedicalHistory(medicalHistory.filter((history) => history.id_ !== id));
    }
  };

  const onEdit = async (values) => {
    const response = await updateMedicalHistory({
      variables: {
        id_: values.id_,
        record: {
          name: values.name,
          date:
            typeof values.date === 'string'
              ? values.date
              : formatISO(values?.date, { representation: 'date' }),
          comment: values.comment,
        },
      },
    });

    if (response?.data?.patientInfo?.medicalHistory?.update.ok) {
      setMedicalHistory([
        response?.data?.patientInfo?.medicalHistory?.update?.result,
        ...medicalHistory.filter((history) => history.id_ !== values.id_),
      ]);

      toggleEditMode(values.id, false);
    }
  };

  return (
    <Card
      title={t('Medical history')}
      getTitleIcon={getTitleIcon}
      EditButton={
        <IconButton
          icon={isCreateMode ? 'check' : 'plus'}
          onClick={toggleCreateMode}
        />
      }
    >
      {isCreateMode && (
        <MedicalHistoryForm
          isCreateMode={true}
          onCreate={(values) => onCreate(values)}
          loading={loadingMedicalHistory}
        />
      )}

      {medicalHistory.length === 0 ? (
        <MuiTypography variant="h5" color="textSecondary">
          {t('No medical history')}
        </MuiTypography>
      ) : (
        medicalHistory?.map(({ id_, name, date, comment }) => {
          const { period, type } = countDuration(parseISO(date));

          if (editMode.isEditMode && id_ === editMode.id) {
            return (
              <MedicalHistoryForm
                isCreateMode={false}
                onEdit={onEdit}
                loading={loadingUpdateMedicalHistory}
                item={{
                  id_,
                  name,
                  date,
                  comment,
                }}
              />
            );
          }

          return (
            <MuiBox justifyContent="space-between" display="flex" key={id_}>
              <SContentWrap>
                <MuiBox mb={2}>
                  <MuiTypography variant="subtitle1" color="textSecondary">
                    {format(parseISO(date), 'MMMM dd yyyy')} (
                    {`${type !== dateTypes.new ? `${period} ` : ''}${
                      dateTypesData[type].title
                    }`}
                    )
                  </MuiTypography>
                  <MuiTypography variant="h5">{name}</MuiTypography>
                  <MuiTypography variant="subtitle1" color="textSecondary">
                    {comment}
                  </MuiTypography>
                </MuiBox>

                <CardPopover
                  id={id_}
                  onDelete={onDelete}
                  toggleEditMode={toggleEditMode}
                  deleteDialogTitle={t('Delete medical history')}
                  deleteDialogMessage={t('Do you want delete medical history?')}
                />
              </SContentWrap>
            </MuiBox>
          );
        })
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

export default CardMedicalHistory;
