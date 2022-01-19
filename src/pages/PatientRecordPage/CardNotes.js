import React, { memo, useContext, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { makeValidate } from 'mui-rff';
import { format, parseISO } from 'date-fns';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';

import { FormControl, FormTextField, Icon, IconButton } from 'components/ui';
import AddButton from 'components/Buttons/AddButton';
import { schema } from './validation/cardNotes';
import Card from './Card';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_NOTES } from 'pages/PatientRecordPage/gqlSchemes/getNotes';
import { useLocation } from 'react-router-dom';
import { CREATE_NOTE } from 'pages/PatientRecordPage/gqlSchemes/createNote';
import { DELETE_NOTE } from 'pages/PatientRecordPage/gqlSchemes/deleteNote';
import { UPDATE_NOTE } from 'pages/PatientRecordPage/gqlSchemes/updateNote';
import { ConfirmDeleteDialogContext } from 'routing';
import SContentWrap from 'pages/PatientRecordPage/styled/SContentWrap';
import LoadMore from 'pages/PatientRecordPage/LoadMore';
import CardPopover from 'pages/PatientRecordPage/CardPopover';
import { useTranslation } from 'react-i18next';

const validate = makeValidate(schema);

const CardNotes = memo(function () {
  const [isCreateMode, setCreateMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({});
  const [editMode, setEditMode] = useState({
    id: '',
    isEditMode: false,
  });

  const { open: openConfirmDeleteDialog } = useContext(
    ConfirmDeleteDialogContext
  );

  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { t } = useTranslation();

  const [getNotes, { data, loading }] = useLazyQuery(GET_NOTES, {
    fetchPolicy: 'no-cache',
    variables: {
      patient: id,
      page: currentPage,
      perPage: 2,
    },
  });

  const [
    createNote,
    { loading: loadingCreateNote, data: createNoteData },
  ] = useMutation(CREATE_NOTE);

  const [
    deleteNote,
    { loading: loadingDeleteNote, data: deleteNoteData },
  ] = useMutation(DELETE_NOTE);

  const [
    updateNote,
    { loading: loadingUpdateNote, data: updateNoteData },
  ] = useMutation(UPDATE_NOTE);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    setNotes([...notes, ...(data?.patientInfo?.note?.pagination?.items || [])]);
    setPageInfo(data?.patientInfo?.note?.pagination?.pageInfo);
  }, [data]);

  const toggleCreateMode = () => {
    setCreateMode(!isCreateMode);
  };

  const onDeleteNote = async (id) => {
    const response = await deleteNote({
      variables: {
        id_: id,
      },
    });

    if (response?.data?.patientInfo?.note?.delete.ok) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const getTitleIcon = (props) => <Icon icon="sticky-note" {...props} />;

  const loadMore = () => {
    getNotes({
      variables: {
        page: currentPage + 1,
        perPage: 2,
      },
    });
    setCurrentPage(currentPage + 1);
  };

  const onCreateNote = async (values) => {
    const response = await createNote({
      variables: {
        record: {
          patient: id,
          title: values.title,
          content: values.note,
        },
      },
    });

    if (response?.data?.patientInfo?.note?.create.ok) {
      setNotes([response?.data?.patientInfo?.note?.create?.result, ...notes]);
    }
  };

  const toggleEditMode = (id, isEditMode) => {
    setEditMode({
      id,
      isEditMode,
    });
  };

  const onEditNote = async (values) => {
    const response = await updateNote({
      variables: {
        record: {
          id_: values.id,
          title: values.title,
          content: values.note,
        },
      },
    });

    if (response?.data?.patientInfo?.note?.update.ok) {
      setNotes([
        response?.data?.patientInfo?.note?.update?.result,
        ...notes.filter((note) => note.id !== values.id),
      ]);

      toggleEditMode(values.id, false);
    }
  };

  return (
    <>
      <Card
        title={t('Notes')}
        getTitleIcon={getTitleIcon}
        EditButton={
          <IconButton
            icon={isCreateMode ? 'check' : 'plus'}
            onClick={toggleCreateMode}
          />
        }
      >
        {isCreateMode && (
          <Form
            onSubmit={onCreateNote}
            initialValues={{
              title: '',
              note: '',
            }}
            validate={validate}
            render={({ values, handleSubmit, invalid }) => {
              return (
                <form>
                  <MuiBox mb={2}>
                    <MuiTypography variant="h5">
                      {t('Add an note')}
                    </MuiTypography>
                  </MuiBox>
                  <FormControl>
                    <FormTextField
                      name="title"
                      placeholder={`${t('Title')}...`}
                    />
                  </FormControl>
                  <FormControl>
                    <FormTextField
                      multiline
                      name="note"
                      placeholder={`${t('Note')}...`}
                    />
                  </FormControl>

                  <MuiBox display="flex" justifyContent="flex-end">
                    <AddButton
                      onClick={handleSubmit}
                      disabled={loadingCreateNote || invalid}
                      title={t('Add a note')}
                      type="submit"
                      loading={loadingCreateNote}
                    />
                  </MuiBox>
                </form>
              );
            }}
          />
        )}

        {notes.length === 0 ? (
          <MuiTypography variant="h5" color="textSecondary">
            {t('No notes')}
          </MuiTypography>
        ) : (
          notes?.map(
            ({
              id,
              title,
              content,
              createdBy,
              patient,
              createdAt,
              updatedAt,
            }) => {
              if (editMode.isEditMode && id === editMode.id) {
                return (
                  <Form
                    key={id}
                    onSubmit={onEditNote}
                    initialValues={{
                      id,
                      title,
                      note: content,
                    }}
                    validate={validate}
                    render={({ values, handleSubmit, invalid }) => {
                      return (
                        <form>
                          <MuiBox mb={2}>
                            <MuiTypography variant="h5">
                              {t('Edit an note')}
                            </MuiTypography>
                          </MuiBox>
                          <FormControl>
                            <FormTextField
                              name="title"
                              placeholder={`${t('Title')}...`}
                            />
                          </FormControl>
                          <FormControl>
                            <FormTextField
                              multiline
                              name="note"
                              placeholder={`${t('Note')}...`}
                            />
                          </FormControl>

                          <MuiBox display="flex" justifyContent="flex-end">
                            <AddButton
                              onClick={handleSubmit}
                              disabled={loadingUpdateNote || invalid}
                              title={t('Save changes')}
                              type="submit"
                              loading={loadingUpdateNote}
                            />
                          </MuiBox>
                        </form>
                      );
                    }}
                  />
                );
              }

              return (
                <div key={id}>
                  <MuiBox
                    justifyContent="space-between"
                    display="flex"
                    key={id}
                    my={2}
                  >
                    <SContentWrap>
                      <MuiBox>
                        <MuiTypography
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          {format(
                            parseISO(createdAt || updatedAt),
                            'MMM do, yyyy HH:mm'
                          )}
                        </MuiTypography>
                        <MuiTypography variant="h5">{title}</MuiTypography>
                        <MuiTypography variant="h5">{content}</MuiTypography>
                        <MuiTypography
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          {`${createdBy.firstName} ${createdBy.lastName}`}
                        </MuiTypography>
                      </MuiBox>

                      <CardPopover
                        id={id}
                        onDelete={onDeleteNote}
                        toggleEditMode={toggleEditMode}
                        deleteDialogTitle={t('Delete note')}
                        deleteDialogMessage={t('Do you want delete note?')}
                      />
                    </SContentWrap>
                  </MuiBox>
                </div>
              );
            }
          )
        )}

        <LoadMore
          loading={loading}
          pageInfo={pageInfo}
          currentPage={currentPage}
          onLoadMore={loadMore}
        />
      </Card>
    </>
  );
});

export default CardNotes;
