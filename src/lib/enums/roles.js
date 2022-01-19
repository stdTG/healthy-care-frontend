export const dashboardUserRoles = {
  admin: 'admin',
  superAdmin: 'super_admin',
  unknown: 'unknown',
  careTeamMember: 'care_team_member',
  supervisor: 'supervisor',
};

export const roles = {
  doctor: 'DOCTOR',
  admin: 'ADMIN',
  supervisor: 'SUPERVISOR',
  nurse: 'NURSE',
  medicalAssistant: 'MEDICAL_ASSISTANT',
  other: 'OTHER',
  contentPublisher: 'CONTENT_PUBLISHER',
  patient: 'PATIENT',
};

export const rolesData = {
  [roles.doctor]: {
    label: 'Doctor',
    value: roles.doctor,
  },
  [roles.supervisor]: {
    label: 'Supervisor',
    value: roles.supervisor,
  },
  [roles.nurse]: {
    label: 'Nurse',
    value: roles.nurse,
  },
  [roles.other]: {
    label: 'Other',
    value: roles.other,
  },
  [roles.medicalAssistant]: {
    label: 'Medical assistant',
    value: roles.medicalAssistant,
  },
};
