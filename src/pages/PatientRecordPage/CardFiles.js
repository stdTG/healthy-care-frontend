import React, { useState, memo } from 'react';
import { append } from 'ramda';
import { useParams } from 'react-router-dom';
import { format, getTime } from 'date-fns';
import useFetch from 'use-http';
import shortid from 'shortid';
import {
  CardContent as MuiCardContent,
  Typography as MuiTypography,
  Card as MuiCard,
  Box as MuiBox,
} from '@material-ui/core';

import { Icon, IconButton } from 'components/ui';
import UploadButton from 'components/Buttons/UploadButton';
import Card from './Card';
import { useTranslation } from 'react-i18next';

const documentTypes = {
  1: {
    name: 'Image',
  },
  2: {
    name: 'PDF',
  },
};

const CardFiles = memo(function CardFiles(props) {
  const { id } = useParams();
  const { post, response } = useFetch(`/files/${id}`);
  const [isEditMode, setEditMode] = useState(false);
  const [files, setFiles] = useState([
    {
      title: '',
      id: shortid.generate(),
      fileName: '5p07a460d3806c07fc513d3e.jpg',
      url: {
        relative: '',
        absolute:
          'https://i.pinimg.com/236x/e9/b5/17/e9b5174f026c7fc63c96a2127c187cb3--school-of-visual-arts-experimental-photography.jpg',
      },
      type: 1,
      thumbnailUrl: null,
      lastUpdated: getTime(new Date()),
      size: '4',
    },
  ]);
  const { t } = useTranslation();

  const onUpload = async (event) => {
    const formData = new FormData();
    formData.append('document', event.currentTarget.files[0]);
    const file = post('', formData);

    if (response.ok) {
      setFiles(append(file, files));
    }

    //TODO remove mocked data
    setFiles(
      append(
        {
          title: '',
          id: shortid.generate(),
          fileName: '5d07a460d3806c07fc513d3e.jpg',
          url: {
            relative: '',
            absolute:
              'https://i.pinimg.com/236x/e9/b5/17/e9b5174f026c7fc63c96a2127c187cb3--school-of-visual-arts-experimental-photography.jpg',
          },
          type: 1,
          thumbnailUrl: null,
          lastUpdated: getTime(new Date()),
          size: '4',
        },
        files
      )
    );
  };
  const onEdit = () => {
    setEditMode(!isEditMode);
  };
  const getTitleIcon = (props) => <Icon icon="copy" {...props} />;

  return (
    <Card
      title={t('Files')}
      getTitleIcon={getTitleIcon}
      EditButton={
        <IconButton icon={isEditMode ? 'check' : 'pen'} onClick={onEdit} />
      }
    >
      {isEditMode && (
        <MuiBox mb={2}>
          <UploadButton onChange={onUpload} title={t('Add file')} />
        </MuiBox>
      )}

      {files.length === 0 ? (
        <MuiTypography variant="h5" color="textSecondary">
          {t('No files')}
        </MuiTypography>
      ) : (
        files.map((item) => (
          <MuiCard key={item.id} style={{ marginBottom: '20px' }}>
            <MuiCardContent>
              <MuiBox display="flex">
                <img
                  src={item.url.absolute}
                  alt={item.title}
                  style={{ height: '70px', width: '70px', marginRight: '10px' }}
                />
                <div style={{ width: '100%' }}>
                  <MuiBox display="flex" justifyContent="space-between">
                    <MuiTypography>{item.title || item.fileName}</MuiTypography>
                    {isEditMode && (
                      <IconButton
                        icon="trash-alt"
                        color="warning"
                        onClick={() => {}}
                      />
                    )}
                  </MuiBox>
                  <MuiTypography variant="subtitle2" color="textSecondary">
                    {format(item.lastUpdated, 'd MMM. yyyy')}
                  </MuiTypography>
                  <MuiTypography variant="subtitle2" color="textSecondary">
                    {documentTypes[item.type].name}
                    <span style={{ margin: '5px' }}>&sdot;</span>
                    {item.size}
                  </MuiTypography>
                </div>
              </MuiBox>
            </MuiCardContent>
          </MuiCard>
        ))
      )}
    </Card>
  );
});

export default CardFiles;
