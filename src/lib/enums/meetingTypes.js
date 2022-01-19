export const meetingTypes = {
  vaccination: 'VACCINATION',
  consultation: 'CONSULTATION',
  checkup: 'CHECKUP',
  imagery: 'IMAGERY',
  labtest: 'LABTEST',
  screeningtest: 'SCREENINGTEST',
  socialcare: 'SOCIALCARE',
  surgery: 'SURGERY',
  urgence: 'URGENCE',
  addareason: 'ADDAREASON',
  other: 'OTHER',
};

export const locationTypes = {
  clinic: 'MEDICAL_CLINIC',
  online: 'ONLINE',
};

export const meetingTypesData = {
  [meetingTypes.vaccination]: {
    label: 'Vaccination',
    value: meetingTypes.vaccination,
  },
  [meetingTypes.consultation]: {
    label: 'Consultation',
    value: meetingTypes.consultation,
  },
  [meetingTypes.imagery]: {
    label: 'Imagery',
    value: meetingTypes.imagery,
  },
  [meetingTypes.labtest]: {
    label: 'Lab test',
    value: meetingTypes.labtest,
  },
  [meetingTypes.screeningtest]: {
    label: 'Screening test',
    value: meetingTypes.screeningtest,
  },
  [meetingTypes.socialcare]: {
    label: 'Social care',
    value: meetingTypes.socialcare,
  },
  [meetingTypes.surgery]: {
    label: 'Surgery',
    value: meetingTypes.surgery,
  },
  [meetingTypes.urgence]: {
    label: 'Urgence',
    value: meetingTypes.urgence,
  },
  [meetingTypes.addareason]: {
    label: 'Add a reason',
    value: meetingTypes.addareason,
  },
};
export const locationTypesData = {
  [locationTypes.clinic]: {
    label: 'Medical clinic',
    value: locationTypes.clinic,
  },
  [locationTypes.online]: {
    label: 'Online',
    value: locationTypes.online,
  },
};
