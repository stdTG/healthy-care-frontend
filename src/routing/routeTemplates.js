export const careTeamMemberRouteTemplates = {
  dashboardPage: '/',
  schedulePage: '/schedule',
  patientsPage: '/patients',
  patientRecordPage: '/patientRecord/:id',
  chatPage: '/chat',
  alertPage: '/alert',
  carePlansWorkspace_List: '/care-plans/workspace',
  carePlansTemplate_List: '/care-plans/templates',
  carePlanTemplate_One: '/care-plans/template/builder/:id_',
  carePlanWorkspace_New: '/care-plans/workspace/builder/new',
  carePlanWorkspace_One: '/care-plans/workspace/builder/:id_',
  profileSettingsPage: '/profileSettings',
};

export const adminRouteTemplates = {
  dashboardPage: '/',
  settingsPage: '/settings',
  settingsUserPage: '/settings/user/:id',
  userSettingsPage: '/userSettings',
  subOrganizationPage: '/settings/subOrg/:id',
  careTeamPage: '/settings/careTeam/:id',
  subOrgPage: '/settings/subOrg/:id',
  profileSettingsPage: '/profileSettings',
};

export const superAdminRouteTemplates = {
  settingsPage: '/',
};
