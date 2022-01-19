import React from 'react';
import { map, values } from 'ramda';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import OpacityOutlinedIcon from '@material-ui/icons/OpacityOutlined';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

export const recordList = {
  basicInformation: '0',
  medicalConditions: '1',
  metrics: '2',
  medication: '3',
  allergies: '4',
  vaccines: '5',
  lifestyle: '6',
  medicalHistory: '7',
  familyBackground: '8',
  notes: '9',
  files: '10',
};

export const recordListData = {
  [recordList.basicInformation]: {
    label: 'Basic information',
    value: recordList.basicInformation,
    icon: AccountCircleOutlinedIcon,
  },
  [recordList.medicalConditions]: {
    label: 'Medical conditions',
    value: recordList.medicalConditions,
    icon: FavoriteBorderOutlinedIcon,
  },
  [recordList.metrics]: {
    label: 'Metrics',
    value: recordList.metrics,
    icon: InsertChartOutlinedIcon,
  },
  [recordList.medication]: {
    label: 'Medication',
    value: recordList.medication,
    icon: OpacityOutlinedIcon,
  },
  [recordList.allergies]: {
    label: 'Allergies',
    value: recordList.allergies,
    icon: FilterVintageIcon,
  },
  [recordList.vaccines]: {
    label: 'Vaccines',
    value: recordList.vaccines,
    icon: TouchAppIcon,
  },
  [recordList.lifestyle]: {
    label: 'Lifestyle',
    value: recordList.lifestyle,
    icon: AccessibilityIcon,
  },
  [recordList.medicalHistory]: {
    label: 'Medical history',
    value: recordList.medicalHistory,
    icon: PostAddIcon,
  },
  [recordList.familyBackground]: {
    label: 'Family background',
    value: recordList.familyBackground,
    icon: SupervisedUserCircleOutlinedIcon,
  },
  [recordList.notes]: {
    label: 'Notes',
    value: recordList.notes,
    icon: SubjectOutlinedIcon,
  },
  [recordList.files]: {
    label: 'Files',
    value: recordList.files,
    icon: InsertDriveFileOutlinedIcon,
  },
};

export const recordListWithIcons = map((item) => {
  return {
    ...item,
    label: (
      <div>
        {React.createElement(item.icon)} {item.label}
      </div>
    ),
  };
}, values(recordListData));
