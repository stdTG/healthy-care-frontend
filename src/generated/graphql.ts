import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Decimal` scalar type represents a python Decimal. */
  Decimal: any;
  /**
   * The `Time` scalar type represents a Time value as
   * specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Time: any;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /** Graphene representation mongo object id */
  GrapheneMongoId: any;
};

export type ErrorInterface = {
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type AppointmentAndEvent = Appointment | Event;

export type OrgUnit = CareTeam | SubOrganization;

export type OrgUnitPayload = CareTeam | SubOrganization;

export type AddAllergy = {
  __typename?: 'AddAllergy';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Allergy>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** Add working hours for Dashboard user. */
export type AddHours = {
  __typename?: 'AddHours';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<DashboardUser>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Add working hours to master organization. */
export type AddHoursToMasterOrg = {
  __typename?: 'AddHoursToMasterOrg';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<MasterOrganization>;
};

/** Add working hours to sub organization. */
export type AddHoursToSubOrg = {
  __typename?: 'AddHoursToSubOrg';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<SubOrganization>;
  resultId?: Maybe<Scalars['ID']>;
};

export type AddLifestyle = {
  __typename?: 'AddLifestyle';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Lifestyle>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type AddMedCondition = {
  __typename?: 'AddMedCondition';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<MedicalConditionPatient>;
  resultUuid?: Maybe<Scalars['UUID']>;
};

export type AddMedHistory = {
  __typename?: 'AddMedHistory';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<MedicalHistory>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Add user to care-team or sub-organization. */
export type AddUserToOrgUnit = {
  __typename?: 'AddUserToOrgUnit';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<OrgUnit>;
  resultId?: Maybe<Scalars['ID']>;
};

export type AddVaccine = {
  __typename?: 'AddVaccine';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Vaccine>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type Address = {
  __typename?: 'Address';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type Allergy = {
  __typename?: 'Allergy';
  date?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  uuid?: Maybe<Scalars['UUID']>;
};

export type AllergyMutations = {
  __typename?: 'AllergyMutations';
  add?: Maybe<AddAllergy>;
  delete?: Maybe<DeleteAllergy>;
  update?: Maybe<UpdateAllergy>;
};


export type AllergyMutationsAddArgs = {
  patient: Scalars['ID'];
  record: AllergyInput;
};


export type AllergyMutationsDeleteArgs = {
  allergyUuid: Scalars['UUID'];
  patient: Scalars['ID'];
};


export type AllergyMutationsUpdateArgs = {
  patient: Scalars['ID'];
  record: AllergyUpdateInput;
};

export type Appointment = {
  __typename?: 'Appointment';
  createdAt?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<DashboardUser>;
  endDate?: Maybe<Scalars['DateTime']>;
  eventType?: Maybe<EventType>;
  id_?: Maybe<Scalars['ID']>;
  isAppointment?: Maybe<Scalars['Boolean']>;
  isOnline?: Maybe<Scalars['Boolean']>;
  location?: Maybe<SubOrganization>;
  note?: Maybe<Scalars['String']>;
  patient?: Maybe<PatientWithStatus>;
  startDate?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<UserWithStatus>;
};

/** Mutation to cancel appointment by id. */
export type CancelAppointment = {
  __typename?: 'CancelAppointment';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Appointment>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to cancel Event by id. */
export type CancelEvent = {
  __typename?: 'CancelEvent';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Event>;
  resultId?: Maybe<Scalars['ID']>;
};

export type CarePlanAssignment = {
  __typename?: 'CarePlanAssignment';
  assigmentDateTime?: Maybe<Scalars['DateTime']>;
  carePlan?: Maybe<GqlCarePlan>;
  executionStartDateTime?: Maybe<Scalars['DateTime']>;
};

export type CarePlanAssignment_PagedList_FromFactory = {
  __typename?: 'CarePlanAssignment_PagedList_FromFactory';
  items?: Maybe<Array<Maybe<CarePlanAssignment>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CarePlanMutations = {
  __typename?: 'CarePlanMutations';
  clone?: Maybe<CloneCarePlan>;
  /**
   * Create new care plan.
   *
   * revision is being set to 1 and then autoincremented on further updates
   * status is DRAFT. It can be changed by calling Publish
   */
  create?: Maybe<CreateCarePlan>;
  delete?: Maybe<DeleteCarePlan>;
  isRun?: Maybe<IsRunCarePlan>;
  loadJson?: Maybe<LoadJsonCarePlan>;
  publish?: Maybe<PublishCarePlan>;
  runCarePlan?: Maybe<RunCarePlan>;
  /** Run care plans by medical condition index for all patient in dashboard user's care team */
  runCarePlans?: Maybe<RunCarePlans>;
  update?: Maybe<UpdateCarePlan>;
};


export type CarePlanMutationsCloneArgs = {
  id_?: Maybe<Scalars['ID']>;
  type: GqlCarePlanType;
};


export type CarePlanMutationsCreateArgs = {
  data: CarePlanInput;
  type: GqlCarePlanType;
};


export type CarePlanMutationsDeleteArgs = {
  id_?: Maybe<Scalars['ID']>;
  type: GqlCarePlanType;
};


export type CarePlanMutationsIsRunArgs = {
  assignmentId?: Maybe<Scalars['ID']>;
};


export type CarePlanMutationsLoadJsonArgs = {
  id_?: Maybe<Scalars['ID']>;
  type: GqlCarePlanType;
  uiJson?: Maybe<Scalars['String']>;
};


export type CarePlanMutationsPublishArgs = {
  id_?: Maybe<Scalars['ID']>;
  type: GqlCarePlanType;
};


export type CarePlanMutationsRunCarePlanArgs = {
  carePlanId: Scalars['ID'];
  patientId: Scalars['ID'];
};


export type CarePlanMutationsRunCarePlansArgs = {
  carePlanId: Scalars['ID'];
  medicalConditionIndex: Scalars['ID'];
};


export type CarePlanMutationsUpdateArgs = {
  data: CarePlanInput;
  type: GqlCarePlanType;
};

export type CarePlanQueries = {
  __typename?: 'CarePlanQueries';
  assignments?: Maybe<CarePlanAssignment_PagedList_FromFactory>;
  list?: Maybe<GqlCarePlan_PagedList_FromFactory>;
  one?: Maybe<GqlCarePlan>;
};


export type CarePlanQueriesAssignmentsArgs = {
  page?: Scalars['Int'];
  patient?: Maybe<Scalars['ID']>;
  perPage?: Scalars['Int'];
};


export type CarePlanQueriesListArgs = {
  page?: Scalars['Int'];
  perPage?: Scalars['Int'];
  type?: Maybe<GqlCarePlanType>;
};


export type CarePlanQueriesOneArgs = {
  id_?: Maybe<Scalars['ID']>;
  type?: Maybe<GqlCarePlanType>;
};

export type CareTeam = {
  __typename?: 'CareTeam';
  id_?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  subOrg?: Maybe<SubOrganization>;
  supervisors?: Maybe<Array<Maybe<DashboardUser>>>;
  users?: Maybe<Array<Maybe<DashboardUser>>>;
};

export type CareTeamPagination = {
  __typename?: 'CareTeamPagination';
  items: Array<Maybe<CareTeam>>;
  pageInfo: PaginationInfo;
};

export type CloneCarePlan = {
  __typename?: 'CloneCarePlan';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

/** Confirm default working hours for master organization. */
export type ConfirmWorkingHours = {
  __typename?: 'ConfirmWorkingHours';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<MasterOrganization>;
};

/** Mutation to create appointment. */
export type CreateAppointment = {
  __typename?: 'CreateAppointment';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Appointment>;
  resultId?: Maybe<Scalars['ID']>;
};

/**
 * Create new care plan.
 *
 * revision is being set to 1 and then autoincremented on further updates
 * status is DRAFT. It can be changed by calling Publish
 */
export type CreateCarePlan = {
  __typename?: 'CreateCarePlan';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<GqlCarePlan>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to create care team. */
export type CreateCareTeam = {
  __typename?: 'CreateCareTeam';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<CareTeam>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to create Dashboard user. */
export type CreateDashboardUser = {
  __typename?: 'CreateDashboardUser';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<DashboardUser>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to create event. */
export type CreateEvent = {
  __typename?: 'CreateEvent';
  error?: Maybe<NotAvailableErrorExtend>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Event>;
  resultId?: Maybe<Scalars['ID']>;
};

export type CreateNote = {
  __typename?: 'CreateNote';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Note>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to create user patient. */
export type CreatePatientUser = {
  __typename?: 'CreatePatientUser';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<PatientUser>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to create suborganization. */
export type CreateSubOrg = {
  __typename?: 'CreateSubOrg';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<SubOrganization>;
  resultId?: Maybe<Scalars['ID']>;
};

export type DashboardUser = {
  __typename?: 'DashboardUser';
  birthDate?: Maybe<Scalars['Date']>;
  byEmail?: Maybe<UserByEmail>;
  byPhone?: Maybe<UserByPhone>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  firstName: Scalars['String'];
  fullAddress?: Maybe<Address>;
  id_: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  memberSince?: Maybe<Scalars['Date']>;
  orgUnit?: Maybe<OrgUnitPayload>;
  role?: Maybe<RoleEnum>;
  sex?: Maybe<SexEnum>;
  speciality?: Maybe<SpecialityEnum>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  workingHours?: Maybe<Array<Maybe<WorkingHours>>>;
};

export type DashboardUserMutations = {
  __typename?: 'DashboardUserMutations';
  /** Add working hours for Dashboard user. */
  addHoursMe?: Maybe<AddHours>;
  /** Mutation to create Dashboard user. */
  create?: Maybe<CreateDashboardUser>;
  /** Mutation to delete user by id. */
  delete?: Maybe<DeleteUser>;
  /** Mutation to update basic Dashboard user information. */
  update?: Maybe<UpdateDashboardUser>;
  /** Mutation to update basic Dashboard user information. */
  updateMe?: Maybe<UpdateDashboardUserMe>;
};


export type DashboardUserMutationsAddHoursMeArgs = {
  record: AddWorkingHoursInput;
};


export type DashboardUserMutationsCreateArgs = {
  record: DashboardUserInput;
};


export type DashboardUserMutationsDeleteArgs = {
  id_: Scalars['ID'];
};


export type DashboardUserMutationsUpdateArgs = {
  record: DashboardUserUpdateInput;
  user: Scalars['ID'];
};


export type DashboardUserMutationsUpdateMeArgs = {
  record: DashboardUserUpdateMeInput;
};

export type DashboardUserPagination = {
  __typename?: 'DashboardUserPagination';
  items: Array<Maybe<DashboardUser>>;
  pageInfo: PaginationInfo;
};

export type DashboardUserQueries = {
  __typename?: 'DashboardUserQueries';
  me?: Maybe<DashboardUser>;
  pagedList?: Maybe<DashboardUserPagination>;
};


export type DashboardUserQueriesPagedListArgs = {
  filter?: Maybe<FilterFindManyUserInput>;
  page: Scalars['Int'];
  perPage?: Scalars['Int'];
};

export type DeleteAllergy = {
  __typename?: 'DeleteAllergy';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type DeleteCarePlan = {
  __typename?: 'DeleteCarePlan';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

/** Mutation to delete patient by id. */
export type DeleteCareTeam = {
  __typename?: 'DeleteCareTeam';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

export type DeleteLifestyle = {
  __typename?: 'DeleteLifestyle';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type DeleteMedCondition = {
  __typename?: 'DeleteMedCondition';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

export type DeleteMedHistory = {
  __typename?: 'DeleteMedHistory';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

export type DeleteNote = {
  __typename?: 'DeleteNote';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

/** Mutation to delete patient by id. */
export type DeletePatient = {
  __typename?: 'DeletePatient';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

/** Mutation to delete patient by id. */
export type DeleteSubOrg = {
  __typename?: 'DeleteSubOrg';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

/** Mutation to delete user by id. */
export type DeleteUser = {
  __typename?: 'DeleteUser';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

/** Delete user from care-team or sub-organization. */
export type DeleteUserFromOrgUnit = {
  __typename?: 'DeleteUserFromOrgUnit';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<OrgUnit>;
  resultId?: Maybe<Scalars['ID']>;
};

export type DeleteVaccine = {
  __typename?: 'DeleteVaccine';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type Error = ErrorInterface & {
  __typename?: 'Error';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  createdAt?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<DashboardUser>;
  endDate?: Maybe<Scalars['DateTime']>;
  eventType?: Maybe<EventType>;
  id_?: Maybe<Scalars['ID']>;
  isAppointment?: Maybe<Scalars['Boolean']>;
  isOnline?: Maybe<Scalars['Boolean']>;
  location?: Maybe<SubOrganization>;
  patients?: Maybe<Array<Maybe<PatientWithStatus>>>;
  startDate?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<UserWithStatus>>>;
};

export type EventAndAppointmentPayload = {
  __typename?: 'EventAndAppointmentPayload';
  items?: Maybe<Array<Maybe<AppointmentAndEvent>>>;
};

export type EventPagination = {
  __typename?: 'EventPagination';
  items?: Maybe<Array<Maybe<AppointmentAndEvent>>>;
  pageInfo: PaginationInfo;
};

export type Family = {
  __typename?: 'Family';
  father?: Maybe<Scalars['String']>;
  grandparents?: Maybe<Scalars['String']>;
  mother?: Maybe<Scalars['String']>;
};

export type GqlCarePlan = {
  __typename?: 'GqlCarePlan';
  authorId?: Maybe<Scalars['ID']>;
  awsStateMachineArn?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  durationDays?: Maybe<Scalars['Int']>;
  durationMonths?: Maybe<Scalars['Int']>;
  durationWeeks?: Maybe<Scalars['Int']>;
  id_?: Maybe<Scalars['ID']>;
  image: Scalars['String'];
  name: Scalars['String'];
  revision: Scalars['String'];
  status?: Maybe<GqlCarePlanStatus>;
  subtitle?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  uiJson?: Maybe<Scalars['String']>;
};

export type GqlCarePlan_PagedList_FromFactory = {
  __typename?: 'GqlCarePlan_PagedList_FromFactory';
  items?: Maybe<Array<Maybe<GqlCarePlan>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type IsRunCarePlan = {
  __typename?: 'IsRunCarePlan';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Item = {
  __typename?: 'Item';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type Lifestyle = {
  __typename?: 'Lifestyle';
  healthRating?: Maybe<Scalars['String']>;
  sleepHealth?: Maybe<Scalars['String']>;
  fitness?: Maybe<Scalars['String']>;
  smoking?: Maybe<Scalars['String']>;
  drinking?: Maybe<Scalars['String']>;
  nutrition?: Maybe<Scalars['String']>;
  drug?: Maybe<Scalars['String']>;
  diet?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type LifestyleMutations = {
  __typename?: 'LifestyleMutations';
  add?: Maybe<AddLifestyle>;
  delete?: Maybe<DeleteLifestyle>;
  update?: Maybe<UpdateLifestyle>;
};


export type LifestyleMutationsAddArgs = {
  patient: Scalars['ID'];
  record: LifestyleInput;
};


export type LifestyleMutationsDeleteArgs = {
  lifestyleUuid: Scalars['UUID'];
  patient: Scalars['ID'];
};


export type LifestyleMutationsUpdateArgs = {
  patient: Scalars['ID'];
  record: LifestyleUpdateInput;
};

export type LoadJsonCarePlan = {
  __typename?: 'LoadJsonCarePlan';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<GqlCarePlan>;
  resultId?: Maybe<Scalars['ID']>;
};

export type MasterOrganization = {
  __typename?: 'MasterOrganization';
  created?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  fullAddress?: Maybe<Address>;
  instagram?: Maybe<Scalars['String']>;
  isDefaultWorkingHours?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  workingHours?: Maybe<Array<Maybe<WorkingHours>>>;
};

export type MedHistoryPagination = {
  __typename?: 'MedHistoryPagination';
  items: Array<Maybe<MedicalHistory>>;
  pageInfo: PaginationInfo;
};

export type MedicalCondition = {
  __typename?: 'MedicalCondition';
  id_?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MedicalConditionMutations = {
  __typename?: 'MedicalConditionMutations';
  addToPatient?: Maybe<AddMedCondition>;
  deleteFromPatient?: Maybe<DeleteMedCondition>;
  updateForPatient?: Maybe<UpdateMedCondition>;
};


export type MedicalConditionMutationsAddToPatientArgs = {
  record: MedicalConditionInput;
};


export type MedicalConditionMutationsDeleteFromPatientArgs = {
  patientId: Scalars['ID'];
  uuid: Scalars['UUID'];
};


export type MedicalConditionMutationsUpdateForPatientArgs = {
  patientId: Scalars['ID'];
  record: MedicalConditionUpdateInput;
};

export type MedicalConditionPatient = {
  __typename?: 'MedicalConditionPatient';
  endDate?: Maybe<Scalars['Date']>;
  index?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type MedicalConditionQueries = {
  __typename?: 'MedicalConditionQueries';
  getByIndex?: Maybe<MedicalCondition>;
  pagination?: Maybe<MedicalCondition_PagedList_FromFactory>;
};


export type MedicalConditionQueriesGetByIndexArgs = {
  id_: Scalars['ID'];
};


export type MedicalConditionQueriesPaginationArgs = {
  page?: Scalars['Int'];
  perPage?: Scalars['Int'];
};

export type MedicalCondition_PagedList_FromFactory = {
  __typename?: 'MedicalCondition_PagedList_FromFactory';
  items?: Maybe<Array<Maybe<MedicalCondition>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type MedicalHistory = {
  __typename?: 'MedicalHistory';
  comment?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  id_?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MedicalHistoryMutations = {
  __typename?: 'MedicalHistoryMutations';
  create?: Maybe<AddMedHistory>;
  delete?: Maybe<DeleteMedHistory>;
  update?: Maybe<UpdateMedHistory>;
};


export type MedicalHistoryMutationsCreateArgs = {
  record: MedicalHistoryInput;
};


export type MedicalHistoryMutationsDeleteArgs = {
  id_: Scalars['ID'];
};


export type MedicalHistoryMutationsUpdateArgs = {
  id_: Scalars['ID'];
  record: MedicalHistoryUpdateInput;
};

export type MedicalHistoryQueries = {
  __typename?: 'MedicalHistoryQueries';
  getById?: Maybe<MedicalHistory>;
  pagination?: Maybe<MedHistoryPagination>;
};


export type MedicalHistoryQueriesGetByIdArgs = {
  id_: Scalars['ID'];
};


export type MedicalHistoryQueriesPaginationArgs = {
  page?: Maybe<Scalars['Int']>;
  patient: Scalars['ID'];
  perPage?: Maybe<Scalars['Int']>;
};

export type Mutations = {
  __typename?: 'Mutations';
  carePlan?: Maybe<CarePlanMutations>;
  orgUnit?: Maybe<OrgUnitMutations>;
  patientInfo?: Maybe<PatientInfoMutations>;
  schedule?: Maybe<ScheduleMutations>;
  user?: Maybe<UserMutations>;
};

/** The object is not found in the database. */
export type NotAvailableError = ErrorInterface & {
  __typename?: 'NotAvailableError';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type NotAvailableErrorExtend = {
  __typename?: 'NotAvailableErrorExtend';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<DashboardUser>>>;
};

/** The object is not found in the database. */
export type NotFoundError = ErrorInterface & {
  __typename?: 'NotFoundError';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type Note = {
  __typename?: 'Note';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<DashboardUser>;
  id?: Maybe<Scalars['ID']>;
  patient?: Maybe<PatientUser>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type NoteMutations = {
  __typename?: 'NoteMutations';
  create?: Maybe<CreateNote>;
  delete?: Maybe<DeleteNote>;
  update?: Maybe<UpdateNote>;
};


export type NoteMutationsCreateArgs = {
  record: NoteCreateInput;
};


export type NoteMutationsDeleteArgs = {
  id_: Scalars['ID'];
};


export type NoteMutationsUpdateArgs = {
  record: NoteUpdateInput;
};

export type NotePagination = {
  __typename?: 'NotePagination';
  items: Array<Maybe<Note>>;
  pageInfo: PaginationInfo;
};

export type NoteQueries = {
  __typename?: 'NoteQueries';
  getById?: Maybe<Note>;
  pagination?: Maybe<NotePagination>;
};


export type NoteQueriesGetByIdArgs = {
  id_: Scalars['ID'];
};


export type NoteQueriesPaginationArgs = {
  page?: Maybe<Scalars['Int']>;
  patient: Scalars['ID'];
  perPage?: Maybe<Scalars['Int']>;
};

export type OrgUnitMutations = {
  __typename?: 'OrgUnitMutations';
  /** Add working hours to master organization. */
  addHoursToMasterOrg?: Maybe<AddHoursToMasterOrg>;
  /** Add working hours to sub organization. */
  addHoursToSubOrg?: Maybe<AddHoursToSubOrg>;
  /** Add user to care-team or sub-organization. */
  addUsers?: Maybe<AddUserToOrgUnit>;
  /** Confirm default working hours for master organization. */
  confirmWorkingHours?: Maybe<ConfirmWorkingHours>;
  /** Mutation to create care team. */
  createCareTeam?: Maybe<CreateCareTeam>;
  /** Mutation to create suborganization. */
  createSubOrg?: Maybe<CreateSubOrg>;
  /** Mutation to delete patient by id. */
  deleteCareTeam?: Maybe<DeleteCareTeam>;
  /** Mutation to delete patient by id. */
  deleteSubOrg?: Maybe<DeleteSubOrg>;
  /** Delete user from care-team or sub-organization. */
  deleteUsers?: Maybe<DeleteUserFromOrgUnit>;
  /** Mutation to update care team information. */
  updateCareTeam?: Maybe<UpdateCareTeam>;
  /** Mutation to update master organization information. */
  updateMasterOrg?: Maybe<UpdateMasterOrg>;
  /** Mutation to update sub organization information. */
  updateSubOrg?: Maybe<UpdateSubOrg>;
};


export type OrgUnitMutationsAddHoursToMasterOrgArgs = {
  record: AddWorkingHoursInput;
};


export type OrgUnitMutationsAddHoursToSubOrgArgs = {
  record: AddWorkingHoursToSubOrgInput;
};


export type OrgUnitMutationsAddUsersArgs = {
  record: AddUserToOrgUnitInput;
};


export type OrgUnitMutationsCreateCareTeamArgs = {
  record: CareTeamCreateInput;
};


export type OrgUnitMutationsCreateSubOrgArgs = {
  record: SubOrgCreateInput;
};


export type OrgUnitMutationsDeleteCareTeamArgs = {
  id_: Scalars['ID'];
};


export type OrgUnitMutationsDeleteSubOrgArgs = {
  id_: Scalars['ID'];
};


export type OrgUnitMutationsDeleteUsersArgs = {
  record: AddUserToOrgUnitInput;
};


export type OrgUnitMutationsUpdateCareTeamArgs = {
  record: CareTeamUpdateInput;
};


export type OrgUnitMutationsUpdateMasterOrgArgs = {
  record: MasterOrgUpdateInput;
};


export type OrgUnitMutationsUpdateSubOrgArgs = {
  record: SubOrgUpdateInput;
};

export type OrgUnitQueries = {
  __typename?: 'OrgUnitQueries';
  careTeamById?: Maybe<CareTeam>;
  careTeamPagination?: Maybe<CareTeamPagination>;
  careTeamUserPagination?: Maybe<UserPagination>;
  masterOrgMe?: Maybe<MasterOrganization>;
  subOrgById?: Maybe<SubOrganization>;
  subOrgPagination?: Maybe<SubOrgPagination>;
  subOrgUserPagination?: Maybe<UserPagination>;
};


export type OrgUnitQueriesCareTeamByIdArgs = {
  id_: Scalars['ID'];
};


export type OrgUnitQueriesCareTeamPaginationArgs = {
  filter?: Maybe<FilterFindManyCareTeam>;
  page: Scalars['Int'];
  perPage?: Scalars['Int'];
};


export type OrgUnitQueriesCareTeamUserPaginationArgs = {
  careTeamId: Scalars['ID'];
  filter?: Maybe<FilterFindManyUser>;
  page: Scalars['Int'];
  perPage?: Scalars['Int'];
};


export type OrgUnitQueriesSubOrgByIdArgs = {
  id_: Scalars['ID'];
};


export type OrgUnitQueriesSubOrgPaginationArgs = {
  filter?: Maybe<FilterFindManyOrgUnit>;
  page: Scalars['Int'];
  perPage?: Scalars['Int'];
};


export type OrgUnitQueriesSubOrgUserPaginationArgs = {
  filter?: Maybe<FilterFindManyUser>;
  page: Scalars['Int'];
  perPage?: Scalars['Int'];
  subOrgId: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Int'];
  hasPreviousPage: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  totalItems?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  hasNextPage: Scalars['Int'];
  hasPreviousPage: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  totalItems?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type PatientInfoMutations = {
  __typename?: 'PatientInfoMutations';
  medicalCondition?: Maybe<MedicalConditionMutations>;
  medicalHistory?: Maybe<MedicalHistoryMutations>;
  note?: Maybe<NoteMutations>;
};

export type PatientInfoQueries = {
  __typename?: 'PatientInfoQueries';
  medicalCondition?: Maybe<MedicalConditionQueries>;
  medicalHistory?: Maybe<MedicalHistoryQueries>;
  note?: Maybe<NoteQueries>;
};

export type PatientUser = {
  __typename?: 'PatientUser';
  allergies?: Maybe<Array<Maybe<Allergy>>>;
  assignments?: Maybe<Array<Maybe<CarePlanAssignment>>>;
  birthDate?: Maybe<Scalars['Date']>;
  byEmail?: Maybe<UserByEmail>;
  byPhone?: Maybe<UserByPhone>;
  family?: Maybe<Family>;
  firstName: Scalars['String'];
  fullAddress?: Maybe<Address>;
  id_: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  lifestyle?: Maybe<Array<Maybe<Lifestyle>>>;
  medicalCondition?: Maybe<Array<Maybe<MedicalConditionPatient>>>;
  medicalHistory?: Maybe<Array<Maybe<MedicalHistory>>>;
  sex?: Maybe<SexEnum>;
  vaccines?: Maybe<Array<Maybe<Vaccine>>>;
};

/** Patient user mutations. */
export type PatientUserMutations = {
  __typename?: 'PatientUserMutations';
  allergy?: Maybe<AllergyMutations>;
  /** Mutation to create user patient. */
  create?: Maybe<CreatePatientUser>;
  /** Mutation to delete patient by id. */
  delete?: Maybe<DeletePatient>;
  lifestyle?: Maybe<LifestyleMutations>;
  /** Mutation to update basic patient information. */
  update?: Maybe<UpdatePatient>;
  /** Mutation to update patient`s family information. */
  updateFamily?: Maybe<UpdateFamily>;
  vaccine?: Maybe<VaccineMutations>;
};


/** Patient user mutations. */
export type PatientUserMutationsCreateArgs = {
  record: PatientUserInput;
};


/** Patient user mutations. */
export type PatientUserMutationsDeleteArgs = {
  id_: Scalars['ID'];
};


/** Patient user mutations. */
export type PatientUserMutationsUpdateArgs = {
  record: PatientUpdateInput;
};


/** Patient user mutations. */
export type PatientUserMutationsUpdateFamilyArgs = {
  patient: Scalars['ID'];
  record: FamilyInput;
};

export type PatientUserPagination = {
  __typename?: 'PatientUserPagination';
  items: Array<Maybe<PatientUser>>;
  pageInfo: PaginationInfo;
};

export type PatientUserQueries = {
  __typename?: 'PatientUserQueries';
  one?: Maybe<PatientUser>;
  pagedList?: Maybe<PatientUserPagination>;
};


export type PatientUserQueriesOneArgs = {
  id_?: Maybe<Scalars['ID']>;
};


export type PatientUserQueriesPagedListArgs = {
  filter?: Maybe<FilterFindManyPatientInput>;
  page: Scalars['Int'];
  perPage?: Scalars['Int'];
};

export type PatientWithStatus = {
  __typename?: 'PatientWithStatus';
  allergies?: Maybe<Array<Maybe<Allergy>>>;
  assignments?: Maybe<Array<Maybe<CarePlanAssignment>>>;
  birthDate?: Maybe<Scalars['Date']>;
  byEmail?: Maybe<UserByEmail>;
  byPhone?: Maybe<UserByPhone>;
  family?: Maybe<Family>;
  firstName: Scalars['String'];
  fullAddress?: Maybe<Address>;
  id_: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  lifestyle?: Maybe<Array<Maybe<Lifestyle>>>;
  medicalCondition?: Maybe<Array<Maybe<MedicalConditionPatient>>>;
  medicalHistory?: Maybe<Array<Maybe<MedicalHistory>>>;
  sex?: Maybe<SexEnum>;
  status: AppointmentStatus;
  vaccines?: Maybe<Array<Maybe<Vaccine>>>;
};

export type PublishCarePlan = {
  __typename?: 'PublishCarePlan';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

export type Queries = {
  __typename?: 'Queries';
  carePlan?: Maybe<CarePlanQueries>;
  orgUnit?: Maybe<OrgUnitQueries>;
  patientInfo?: Maybe<PatientInfoQueries>;
  schedule?: Maybe<ScheduleQueries>;
  statistics?: Maybe<StatisticsQueries>;
  user?: Maybe<UserQueries>;
};

/** Mutation to reschedule appointment by id. */
export type RescheduleAppointment = {
  __typename?: 'RescheduleAppointment';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Appointment>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to reschedule event by id. */
export type RescheduleEvent = {
  __typename?: 'RescheduleEvent';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Event>;
  resultId?: Maybe<Scalars['ID']>;
};

export type RunCarePlan = {
  __typename?: 'RunCarePlan';
  assignmentId?: Maybe<Scalars['ID']>;
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  patient?: Maybe<PatientUser>;
  query?: Maybe<Queries>;
};

/** Run care plans by medical condition index for all patient in dashboard user's care team */
export type RunCarePlans = {
  __typename?: 'RunCarePlans';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

export type ScheduleMutations = {
  __typename?: 'ScheduleMutations';
  /** Mutation to cancel appointment by id. */
  cancelAppointment?: Maybe<CancelAppointment>;
  /** Mutation to cancel Event by id. */
  cancelEvent?: Maybe<CancelEvent>;
  /** Mutation to create appointment. */
  createAppointment?: Maybe<CreateAppointment>;
  /** Mutation to create event. */
  createEvent?: Maybe<CreateEvent>;
  /** Mutation to reschedule appointment by id. */
  rescheduleAppointment?: Maybe<RescheduleAppointment>;
  /** Mutation to reschedule event by id. */
  rescheduleEvent?: Maybe<RescheduleEvent>;
  /**
   * Mutation to update event by id.
   * it cancels all appointments on the given times.
   */
  submitEvent?: Maybe<SubmitEvent>;
  /** Mutation to update appointment by id. */
  updateAppointment?: Maybe<UpdateAppointment>;
  /** Mutation to update event by id. */
  updateEvent?: Maybe<UpdateEvent>;
};


export type ScheduleMutationsCancelAppointmentArgs = {
  id_: Scalars['ID'];
};


export type ScheduleMutationsCancelEventArgs = {
  id_: Scalars['ID'];
};


export type ScheduleMutationsCreateAppointmentArgs = {
  record: AppointmentCreateInput;
};


export type ScheduleMutationsCreateEventArgs = {
  record: EventCreateInput;
};


export type ScheduleMutationsRescheduleAppointmentArgs = {
  record: RescheduleAppointmentInput;
};


export type ScheduleMutationsRescheduleEventArgs = {
  record: RescheduleEventInput;
};


export type ScheduleMutationsSubmitEventArgs = {
  id_: Scalars['ID'];
};


export type ScheduleMutationsUpdateAppointmentArgs = {
  record: UpdateAppointmentInput;
};


export type ScheduleMutationsUpdateEventArgs = {
  record: UpdateEventInput;
};

export type ScheduleQueries = {
  __typename?: 'ScheduleQueries';
  appointmentById?: Maybe<Appointment>;
  eventById?: Maybe<Event>;
  eventMany?: Maybe<EventAndAppointmentPayload>;
  eventPagination?: Maybe<EventPagination>;
  timeslotMany?: Maybe<TimeslotPayload>;
};


export type ScheduleQueriesAppointmentByIdArgs = {
  id_: Scalars['ID'];
};


export type ScheduleQueriesEventByIdArgs = {
  id_: Scalars['ID'];
};


export type ScheduleQueriesEventManyArgs = {
  filter: FilterFindManyAppointment;
};


export type ScheduleQueriesEventPaginationArgs = {
  filter: FilterFindManyAppointment;
  page: Scalars['Int'];
  perPage: Scalars['Int'];
};


export type ScheduleQueriesTimeslotManyArgs = {
  filter: FilterFindManyTimeSlot;
};

/** When an unknown error occurs on the server. */
export type ServerError = ErrorInterface & {
  __typename?: 'ServerError';
  code: Scalars['String'];
  message: Scalars['String'];
};

export type StatisticPayload = {
  __typename?: 'StatisticPayload';
  items?: Maybe<Array<Maybe<Item>>>;
};

export type StatisticsQueries = {
  __typename?: 'StatisticsQueries';
  byAge?: Maybe<StatisticPayload>;
  byGender?: Maybe<StatisticPayload>;
  byLocation?: Maybe<StatisticPayload>;
};


export type StatisticsQueriesByAgeArgs = {
  filter?: Maybe<FilterStatistic>;
};


export type StatisticsQueriesByGenderArgs = {
  filter?: Maybe<FilterStatistic>;
};


export type StatisticsQueriesByLocationArgs = {
  filter?: Maybe<FilterStatistic>;
};

export type SubOrgPagination = {
  __typename?: 'SubOrgPagination';
  items: Array<Maybe<SubOrganization>>;
  pageInfo: PaginationInfo;
};

export type SubOrganization = {
  __typename?: 'SubOrganization';
  careTeams?: Maybe<Array<Maybe<CareTeam>>>;
  careTeamsCount?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  fullAddress?: Maybe<Address>;
  id_?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  supervisors?: Maybe<Array<Maybe<DashboardUser>>>;
  users?: Maybe<Array<Maybe<DashboardUser>>>;
  usersCount?: Maybe<Scalars['Int']>;
  workingHours?: Maybe<Array<Maybe<WorkingHours>>>;
};

/**
 * Mutation to update event by id.
 * it cancels all appointments on the given times.
 */
export type SubmitEvent = {
  __typename?: 'SubmitEvent';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Event>;
  resultId?: Maybe<Scalars['ID']>;
};

export type Timeslot = {
  __typename?: 'Timeslot';
  endTime?: Maybe<Scalars['DateTime']>;
  startTime?: Maybe<Scalars['DateTime']>;
};

export type TimeslotPayload = {
  __typename?: 'TimeslotPayload';
  items?: Maybe<Array<Maybe<Timeslot>>>;
};

/** When field already in database and it must be unique. */
export type TitleAlreadyTakenError = ErrorInterface & {
  __typename?: 'TitleAlreadyTakenError';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type UpdateAllergy = {
  __typename?: 'UpdateAllergy';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Allergy>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** Mutation to update appointment by id. */
export type UpdateAppointment = {
  __typename?: 'UpdateAppointment';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Appointment>;
  resultId?: Maybe<Scalars['ID']>;
};

export type UpdateCarePlan = {
  __typename?: 'UpdateCarePlan';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<GqlCarePlan>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to update care team information. */
export type UpdateCareTeam = {
  __typename?: 'UpdateCareTeam';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<CareTeam>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to update basic Dashboard user information. */
export type UpdateDashboardUser = {
  __typename?: 'UpdateDashboardUser';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<DashboardUser>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to update basic Dashboard user information. */
export type UpdateDashboardUserMe = {
  __typename?: 'UpdateDashboardUserMe';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<DashboardUser>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to update event by id. */
export type UpdateEvent = {
  __typename?: 'UpdateEvent';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Event>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to update patient`s family information. */
export type UpdateFamily = {
  __typename?: 'UpdateFamily';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<PatientUser>;
  resultId?: Maybe<Scalars['ID']>;
};

export type UpdateLifestyle = {
  __typename?: 'UpdateLifestyle';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Lifestyle>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** Mutation to update master organization information. */
export type UpdateMasterOrg = {
  __typename?: 'UpdateMasterOrg';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<SubOrganization>;
};

export type UpdateMedCondition = {
  __typename?: 'UpdateMedCondition';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
};

export type UpdateMedHistory = {
  __typename?: 'UpdateMedHistory';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<MedicalHistory>;
  resultId?: Maybe<Scalars['ID']>;
};

export type UpdateNote = {
  __typename?: 'UpdateNote';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Note>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to update basic patient information. */
export type UpdatePatient = {
  __typename?: 'UpdatePatient';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<PatientUser>;
  resultId?: Maybe<Scalars['ID']>;
};

/** Mutation to update sub organization information. */
export type UpdateSubOrg = {
  __typename?: 'UpdateSubOrg';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<SubOrganization>;
  resultId?: Maybe<Scalars['ID']>;
};

export type UpdateVaccine = {
  __typename?: 'UpdateVaccine';
  error?: Maybe<ErrorInterface>;
  ok?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Queries>;
  result?: Maybe<Vaccine>;
  uuid?: Maybe<Scalars['UUID']>;
};

export type UserByEmail = {
  __typename?: 'UserByEmail';
  email: Scalars['String'];
};

export type UserByPhone = {
  __typename?: 'UserByPhone';
  phone: Scalars['String'];
};

export type UserMutations = {
  __typename?: 'UserMutations';
  dashboardUser?: Maybe<DashboardUserMutations>;
  /** Patient user mutations. */
  patientUser?: Maybe<PatientUserMutations>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  items: Array<Maybe<DashboardUser>>;
  pageInfo: PaginationInfo;
};

export type UserQueries = {
  __typename?: 'UserQueries';
  dashboard?: Maybe<DashboardUserQueries>;
  patient?: Maybe<PatientUserQueries>;
};

export type UserWithStatus = {
  __typename?: 'UserWithStatus';
  birthDate?: Maybe<Scalars['Date']>;
  byEmail?: Maybe<UserByEmail>;
  byPhone?: Maybe<UserByPhone>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  firstName: Scalars['String'];
  fullAddress?: Maybe<Address>;
  id_: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  memberSince?: Maybe<Scalars['Date']>;
  orgUnit?: Maybe<OrgUnitPayload>;
  role?: Maybe<RoleEnum>;
  sex?: Maybe<SexEnum>;
  speciality?: Maybe<SpecialityEnum>;
  status: AppointmentStatus;
  title?: Maybe<Scalars['String']>;
  workingHours?: Maybe<Array<Maybe<WorkingHours>>>;
};

export type Vaccine = {
  __typename?: 'Vaccine';
  date?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  uuid?: Maybe<Scalars['UUID']>;
};

export type VaccineMutations = {
  __typename?: 'VaccineMutations';
  add?: Maybe<AddVaccine>;
  delete?: Maybe<DeleteVaccine>;
  update?: Maybe<UpdateVaccine>;
};


export type VaccineMutationsAddArgs = {
  patient: Scalars['ID'];
  record: VaccineInput;
};


export type VaccineMutationsDeleteArgs = {
  patient: Scalars['ID'];
  vaccineUuid: Scalars['UUID'];
};


export type VaccineMutationsUpdateArgs = {
  patient: Scalars['ID'];
  record: VaccineUpdateInput;
};

/** Input data validation error. */
export type ValidationError = ErrorInterface & {
  __typename?: 'ValidationError';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  dayOfWeek?: Maybe<DayOfWeek>;
  endLunchTime?: Maybe<Scalars['Time']>;
  endTime?: Maybe<Scalars['Time']>;
  startLunchTime?: Maybe<Scalars['Time']>;
  startTime?: Maybe<Scalars['Time']>;
};

export enum AppointmentStatus {
  Approved = 'APPROVED',
  Awaiting = 'AWAITING',
  Cancelled = 'CANCELLED',
  Rejected = 'REJECTED'
}

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export enum EventType {
  Consultation = 'CONSULTATION',
  Other = 'OTHER',
  Vaccination = 'VACCINATION'
}

export enum GqlCarePlanStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export enum GqlCarePlanType {
  Template = 'TEMPLATE',
  Workspace = 'WORKSPACE'
}

export enum RoleEnum {
  Admin = 'ADMIN',
  BusinessLeader = 'BUSINESS_LEADER',
  ContentPublisher = 'CONTENT_PUBLISHER',
  Doctor = 'DOCTOR',
  MedicalAssistant = 'MEDICAL_ASSISTANT',
  Nurse = 'NURSE',
  Other = 'OTHER',
  Superadmin = 'SUPERADMIN',
  Supervisor = 'SUPERVISOR'
}

export enum SexEnum {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
  Undefined = 'UNDEFINED'
}

export enum SpecialityEnum {
  Doctor = 'DOCTOR'
}

export type AddUserToOrgUnitInput = {
  orgUnit: Scalars['GrapheneMongoId'];
  users?: Maybe<Array<Scalars['GrapheneMongoId']>>;
};

export type AddWorkingHoursInput = {
  workingHours: Array<WorkingHoursInput>;
};

export type AddWorkingHoursToSubOrgInput = {
  subOrg: Scalars['GrapheneMongoId'];
  workingHours: Array<WorkingHoursInput>;
};

export type AddressInput = {
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
  zipcode?: Maybe<Scalars['String']>;
};

// export type AllergyInput = {
//   date?: Maybe<Scalars['Date']>;
//   name: Scalars['String'];
// };

export type AllergyInput = {
  category: Scalars['String'];
  substance: Scalars['String'];
  reactionTask: Scalars['String'];
  severity: Scalars['String'];
  certainty: Scalars['String'];
  comment: Scalars['String'];
};

export type AllergyUpdateInput = {
  date?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  uuid: Scalars['UUID'];
};

export type AppointmentCreateInput = {
  endDate: Scalars['DateTime'];
  eventType: EventType;
  isOnline: Scalars['Boolean'];
  note?: Maybe<Scalars['String']>;
  patient: Scalars['GrapheneMongoId'];
  startDate: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['GrapheneMongoId']>;
};

export type CarePlanInput = {
  description?: Maybe<Scalars['String']>;
  durationDays?: Maybe<Scalars['Int']>;
  durationMonths?: Maybe<Scalars['Int']>;
  durationWeeks?: Maybe<Scalars['Int']>;
  id_?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CareTeamCreateInput = {
  name: Scalars['String'];
  subOrgId?: Maybe<Scalars['GrapheneMongoId']>;
  supervisors?: Maybe<Array<Scalars['GrapheneMongoId']>>;
  users?: Maybe<Array<Scalars['GrapheneMongoId']>>;
};

export type CareTeamUpdateInput = {
  id_: Scalars['GrapheneMongoId'];
  name: Scalars['String'];
  subOrgId?: Maybe<Scalars['GrapheneMongoId']>;
  supervisors?: Maybe<Array<Scalars['GrapheneMongoId']>>;
  users?: Maybe<Array<Scalars['GrapheneMongoId']>>;
};

export type DashboardUserInput = {
  byEmail?: Maybe<UserByEmailInput>;
  byPhone?: Maybe<UserByPhoneInput>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  orgUnitId?: Maybe<Scalars['ID']>;
  role: RoleEnum;
};

export type DashboardUserUpdateInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  orgUnit?: Maybe<Scalars['ID']>;
  role?: Maybe<RoleEnum>;
};

export type DashboardUserUpdateMeInput = {
  address?: Maybe<AddressInput>;
  birthDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  sex?: Maybe<SexEnum>;
  speciality?: Maybe<SpecialityEnum>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EventCreateInput = {
  endDate: Scalars['DateTime'];
  isOnline: Scalars['Boolean'];
  patients?: Maybe<Array<Maybe<Scalars['GrapheneMongoId']>>>;
  startDate: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<Scalars['GrapheneMongoId']>>>;
};

export type FamilyInput = {
  father?: Maybe<Scalars['String']>;
  grandparents?: Maybe<Scalars['String']>;
  mother?: Maybe<Scalars['String']>;
};

export type FilterFindManyAppointment = {
  endDate?: Maybe<Scalars['Date']>;
  patient?: Maybe<Scalars['GrapheneMongoId']>;
  startDate?: Maybe<Scalars['Date']>;
  user?: Maybe<Scalars['GrapheneMongoId']>;
};

export type FilterFindManyCareTeam = {
  isFree?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type FilterFindManyOrgUnit = {
  name?: Maybe<Scalars['String']>;
};

export type FilterFindManyPatientInput = {
  careTeamId?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  endAge?: Maybe<Scalars['Int']>;
  gender?: Maybe<Array<Maybe<SexEnum>>>;
  location?: Maybe<Scalars['String']>;
  medicalConditionIndex?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  startAge?: Maybe<Scalars['Int']>;
  subOrgId?: Maybe<Scalars['ID']>;
};

export type FilterFindManyTimeSlot = {
  date: Scalars['Date'];
  user?: Maybe<Scalars['GrapheneMongoId']>;
};

export type FilterFindManyUser = {
  name?: Maybe<Scalars['String']>;
};

export type FilterFindManyUserInput = {
  careTeam?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  isFree?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<RoleEnum>;
  subOrg?: Maybe<Scalars['ID']>;
};

/** use deleted patients for statistic */
export type FilterStatistic = {
  careTeamId?: Maybe<Scalars['ID']>;
  deleted?: Maybe<Scalars['Boolean']>;
  subOrgId?: Maybe<Scalars['ID']>;
};

export type LifestyleInput = {
  activity: Scalars['String'];
  description: Scalars['String'];
};

export type LifestyleUpdateInput = {
  activity: Scalars['String'];
  description: Scalars['String'];
  uuid: Scalars['UUID'];
};

export type MasterOrgUpdateInput = {
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  fullAddress?: Maybe<AddressInput>;
  instagram?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
};

export type MedicalConditionInput = {
  endDate?: Maybe<Scalars['Date']>;
  index: Scalars['ID'];
  patientId: Scalars['GrapheneMongoId'];
  startDate: Scalars['Date'];
};

export type MedicalConditionUpdateInput = {
  endDate?: Maybe<Scalars['Date']>;
  startDate: Scalars['Date'];
  uuid: Scalars['UUID'];
};

export type MedicalHistoryInput = {
  comment?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  patient: Scalars['ID'];
};

export type MedicalHistoryUpdateInput = {
  comment?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
};

export type NoteCreateInput = {
  content?: Maybe<Scalars['String']>;
  patient: Scalars['ID'];
  title: Scalars['String'];
};

export type NoteUpdateInput = {
  content?: Maybe<Scalars['String']>;
  id_: Scalars['ID'];
  title: Scalars['String'];
};

export type PatientUpdateInput = {
  address?: Maybe<AddressInput>;
  birthDate?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  id_: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  sex?: Maybe<SexEnum>;
};

export type PatientUserInput = {
  birthDate: Scalars['Date'];
  byEmail?: Maybe<UserByEmailInput>;
  byPhone?: Maybe<UserByPhoneInput>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  sex: SexEnum;
};

export type RescheduleAppointmentInput = {
  endDate: Scalars['DateTime'];
  id_: Scalars['GrapheneMongoId'];
  startDate: Scalars['DateTime'];
};

export type RescheduleEventInput = {
  endDate: Scalars['DateTime'];
  id_: Scalars['GrapheneMongoId'];
  startDate: Scalars['DateTime'];
};

export type SubOrgCreateInput = {
  careTeams?: Maybe<Array<Scalars['GrapheneMongoId']>>;
  email?: Maybe<Scalars['String']>;
  fullAddress?: Maybe<AddressInput>;
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  supervisors?: Maybe<Array<Scalars['GrapheneMongoId']>>;
  users?: Maybe<Array<Scalars['GrapheneMongoId']>>;
};

export type SubOrgUpdateInput = {
  careTeams?: Maybe<Array<Scalars['GrapheneMongoId']>>;
  email?: Maybe<Scalars['String']>;
  fullAddress?: Maybe<AddressInput>;
  id_: Scalars['GrapheneMongoId'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  supervisors?: Maybe<Array<Scalars['GrapheneMongoId']>>;
  users?: Maybe<Array<Scalars['GrapheneMongoId']>>;
};

export type UpdateAppointmentInput = {
  eventType: EventType;
  id_: Scalars['GrapheneMongoId'];
  isOnline: Scalars['Boolean'];
  note: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['GrapheneMongoId']>;
};

export type UpdateEventInput = {
  id_: Scalars['GrapheneMongoId'];
  isOnline: Scalars['Boolean'];
  patients?: Maybe<Array<Scalars['GrapheneMongoId']>>;
  title?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Scalars['GrapheneMongoId']>>;
};

export type UserByEmailInput = {
  email: Scalars['String'];
  sendEmail?: Maybe<Scalars['Boolean']>;
};

export type UserByPhoneInput = {
  phone: Scalars['String'];
  sendSms?: Maybe<Scalars['Boolean']>;
};

export type VaccineInput = {
  date?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
};

export type VaccineUpdateInput = {
  date?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  uuid: Scalars['UUID'];
};

export type WorkingHoursInput = {
  dayOfWeek: DayOfWeek;
  endLunchTime: Scalars['Time'];
  endTime: Scalars['Time'];
  startLunchTime: Scalars['Time'];
  startTime: Scalars['Time'];
};







export type Get_Care_PlansQueryVariables = Exact<{
  type?: Maybe<GqlCarePlanType>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type Get_Care_PlansQuery = (
  { __typename?: 'Queries' }
  & { carePlan?: Maybe<(
    { __typename?: 'CarePlanQueries' }
    & { list?: Maybe<(
      { __typename?: 'GqlCarePlan_PagedList_FromFactory' }
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'GqlCarePlan' }
        & Pick<GqlCarePlan, 'id_' | 'name' | 'subtitle' | 'description' | 'image' | 'durationMonths' | 'durationWeeks' | 'durationDays' | 'authorId' | 'tags' | 'revision' | 'status'>
      )>>>, pageInfo?: Maybe<(
        { __typename?: 'PageInfo' }
        & Pick<PageInfo, 'totalPages' | 'totalItems' | 'page' | 'perPage' | 'hasNextPage'>
      )> }
    )> }
  )> }
);

export type Get_One_Care_PlanQueryVariables = Exact<{
  type?: Maybe<GqlCarePlanType>;
  id_?: Maybe<Scalars['ID']>;
}>;


export type Get_One_Care_PlanQuery = (
  { __typename?: 'Queries' }
  & { carePlan?: Maybe<(
    { __typename?: 'CarePlanQueries' }
    & { one?: Maybe<(
      { __typename?: 'GqlCarePlan' }
      & Pick<GqlCarePlan, 'id_' | 'name' | 'subtitle' | 'description' | 'image' | 'durationMonths' | 'durationWeeks' | 'durationDays' | 'authorId' | 'tags' | 'revision' | 'status' | 'awsStateMachineArn' | 'uiJson'>
    )> }
  )> }
);

export type Load_Care_Plan_JsonMutationVariables = Exact<{
  id_?: Maybe<Scalars['ID']>;
  type: GqlCarePlanType;
  uiJson?: Maybe<Scalars['String']>;
}>;


export type Load_Care_Plan_JsonMutation = (
  { __typename?: 'Mutations' }
  & { carePlan?: Maybe<(
    { __typename?: 'CarePlanMutations' }
    & { loadJson?: Maybe<(
      { __typename?: 'LoadJsonCarePlan' }
      & Pick<LoadJsonCarePlan, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'GqlCarePlan' }
        & Pick<GqlCarePlan, 'id_' | 'name' | 'subtitle' | 'uiJson'>
      )> }
    )> }
  )> }
);

export type Run_Care_PlanMutationVariables = Exact<{
  carePlanId: Scalars['ID'];
  patientId: Scalars['ID'];
}>;


export type Run_Care_PlanMutation = (
  { __typename?: 'Mutations' }
  & { carePlan?: Maybe<(
    { __typename?: 'CarePlanMutations' }
    & { runCarePlan?: Maybe<(
      { __typename?: 'RunCarePlan' }
      & Pick<RunCarePlan, 'ok' | 'assignmentId'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )> }
    )> }
  )> }
);

export type Save_Care_Plan_SettingsMutationVariables = Exact<{
  data: CarePlanInput;
  type: GqlCarePlanType;
}>;


export type Save_Care_Plan_SettingsMutation = (
  { __typename?: 'Mutations' }
  & { carePlan?: Maybe<(
    { __typename?: 'CarePlanMutations' }
    & { create?: Maybe<(
      { __typename?: 'CreateCarePlan' }
      & Pick<CreateCarePlan, 'ok' | 'resultId'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )> }
    )> }
  )> }
);

export type Update_Care_Plan_SettingsMutationVariables = Exact<{
  type: GqlCarePlanType;
  data: CarePlanInput;
}>;


export type Update_Care_Plan_SettingsMutation = (
  { __typename?: 'Mutations' }
  & { carePlan?: Maybe<(
    { __typename?: 'CarePlanMutations' }
    & { update?: Maybe<(
      { __typename?: 'UpdateCarePlan' }
      & Pick<UpdateCarePlan, 'ok' | 'resultId'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'GqlCarePlan' }
        & Pick<GqlCarePlan, 'id_' | 'name' | 'subtitle' | 'description' | 'image' | 'durationMonths' | 'durationWeeks' | 'durationDays' | 'authorId' | 'tags' | 'revision' | 'status' | 'awsStateMachineArn' | 'uiJson'>
      )> }
    )> }
  )> }
);

export type Add_AllergyMutationVariables = Exact<{
  patient: Scalars['ID'];
  record: AllergyInput;
}>;


export type Add_AllergyMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { patientUser?: Maybe<(
      { __typename?: 'PatientUserMutations' }
      & { allergy?: Maybe<(
        { __typename?: 'AllergyMutations' }
        & { add?: Maybe<(
          { __typename?: 'AddAllergy' }
          & Pick<AddAllergy, 'ok'>
          & { error?: Maybe<(
            { __typename?: 'Error' }
            & Pick<Error, 'message'>
          ) | (
            { __typename?: 'NotAvailableError' }
            & Pick<NotAvailableError, 'message'>
          ) | (
            { __typename?: 'NotFoundError' }
            & Pick<NotFoundError, 'message'>
          ) | (
            { __typename?: 'ServerError' }
            & Pick<ServerError, 'message'>
          ) | (
            { __typename?: 'TitleAlreadyTakenError' }
            & Pick<TitleAlreadyTakenError, 'message'>
          ) | (
            { __typename?: 'ValidationError' }
            & Pick<ValidationError, 'message'>
          )>, result?: Maybe<(
            { __typename?: 'Allergy' }
            & Pick<Allergy, 'uuid' | 'name' | 'date'>
          )> }
        )> }
      )> }
    )> }
  )> }
);

export type Add_LifestyleMutationVariables = Exact<{
  patient: Scalars['ID'];
  record: LifestyleInput;
}>;

export type Add_LifestyleMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { patientUser?: Maybe<(
      { __typename?: 'PatientUserMutations' }
      & { allergy?: Maybe<(
        { __typename?: 'LifestyleMutations' }
        & { add?: Maybe<(
          { __typename?: 'AddLifestyle' }
          & Pick<AddAllergy, 'ok'>
          & { error?: Maybe<(
            { __typename?: 'Error' }
            & Pick<Error, 'message'>
          ) | (
            { __typename?: 'NotAvailableError' }
            & Pick<NotAvailableError, 'message'>
          ) | (
            { __typename?: 'NotFoundError' }
            & Pick<NotFoundError, 'message'>
          ) | (
            { __typename?: 'ServerError' }
            & Pick<ServerError, 'message'>
          ) | (
            { __typename?: 'TitleAlreadyTakenError' }
            & Pick<TitleAlreadyTakenError, 'message'>
          ) | (
            { __typename?: 'ValidationError' }
            & Pick<ValidationError, 'message'>
          )>, result?: Maybe<(
            { __typename?: 'Lifestyle' }
            & Pick<Lifestyle, 'uuid' | 'healthRating' | 'healthRating' | 'fitness' | 'smoking' | 'drinking' | 'nutrition' | 'drug' | 'diet'>
          )> }
        )> }
      )> }
    )> }
  )> }
);

export type Add_VaccineMutationVariables = Exact<{
  patient: Scalars['ID'];
  record: VaccineInput;
}>;


export type Add_VaccineMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { patientUser?: Maybe<(
      { __typename?: 'PatientUserMutations' }
      & { vaccine?: Maybe<(
        { __typename?: 'VaccineMutations' }
        & { add?: Maybe<(
          { __typename?: 'AddVaccine' }
          & Pick<AddVaccine, 'ok'>
          & { error?: Maybe<(
            { __typename?: 'Error' }
            & Pick<Error, 'message'>
          ) | (
            { __typename?: 'NotAvailableError' }
            & Pick<NotAvailableError, 'message'>
          ) | (
            { __typename?: 'NotFoundError' }
            & Pick<NotFoundError, 'message'>
          ) | (
            { __typename?: 'ServerError' }
            & Pick<ServerError, 'message'>
          ) | (
            { __typename?: 'TitleAlreadyTakenError' }
            & Pick<TitleAlreadyTakenError, 'message'>
          ) | (
            { __typename?: 'ValidationError' }
            & Pick<ValidationError, 'message'>
          )>, result?: Maybe<(
            { __typename?: 'Vaccine' }
            & Pick<Vaccine, 'uuid' | 'name' | 'date'>
          )> }
        )> }
      )> }
    )> }
  )> }
);

export type Delete_AllergyMutationVariables = Exact<{
  patient: Scalars['ID'];
  allergyUuid: Scalars['UUID'];
}>;


export type Delete_AllergyMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { patientUser?: Maybe<(
      { __typename?: 'PatientUserMutations' }
      & { allergy?: Maybe<(
        { __typename?: 'AllergyMutations' }
        & { delete?: Maybe<(
          { __typename?: 'DeleteAllergy' }
          & Pick<DeleteAllergy, 'ok'>
          & { error?: Maybe<(
            { __typename?: 'Error' }
            & Pick<Error, 'message'>
          ) | (
            { __typename?: 'NotAvailableError' }
            & Pick<NotAvailableError, 'message'>
          ) | (
            { __typename?: 'NotFoundError' }
            & Pick<NotFoundError, 'message'>
          ) | (
            { __typename?: 'ServerError' }
            & Pick<ServerError, 'message'>
          ) | (
            { __typename?: 'TitleAlreadyTakenError' }
            & Pick<TitleAlreadyTakenError, 'message'>
          ) | (
            { __typename?: 'ValidationError' }
            & Pick<ValidationError, 'message'>
          )> }
        )> }
      )> }
    )> }
  )> }
);

export type Delete_VaccineMutationVariables = Exact<{
  patient: Scalars['ID'];
  vaccineUuid: Scalars['UUID'];
}>;


export type Delete_VaccineMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { patientUser?: Maybe<(
      { __typename?: 'PatientUserMutations' }
      & { vaccine?: Maybe<(
        { __typename?: 'VaccineMutations' }
        & { delete?: Maybe<(
          { __typename?: 'DeleteVaccine' }
          & Pick<DeleteVaccine, 'ok'>
          & { error?: Maybe<(
            { __typename?: 'Error' }
            & Pick<Error, 'message'>
          ) | (
            { __typename?: 'NotAvailableError' }
            & Pick<NotAvailableError, 'message'>
          ) | (
            { __typename?: 'NotFoundError' }
            & Pick<NotFoundError, 'message'>
          ) | (
            { __typename?: 'ServerError' }
            & Pick<ServerError, 'message'>
          ) | (
            { __typename?: 'TitleAlreadyTakenError' }
            & Pick<TitleAlreadyTakenError, 'message'>
          ) | (
            { __typename?: 'ValidationError' }
            & Pick<ValidationError, 'message'>
          )> }
        )> }
      )> }
    )> }
  )> }
);

export type Get_Patient_By_IdQueryVariables = Exact<{
  id_?: Maybe<Scalars['ID']>;
}>;


export type Get_Patient_By_IdQuery = (
  { __typename?: 'Queries' }
  & { user?: Maybe<(
    { __typename?: 'UserQueries' }
    & { patient?: Maybe<(
      { __typename?: 'PatientUserQueries' }
      & { one?: Maybe<(
        { __typename?: 'PatientUser' }
        & Pick<PatientUser, 'id_' | 'firstName' | 'lastName' | 'language' | 'sex' | 'birthDate'>
        & { byPhone?: Maybe<(
          { __typename?: 'UserByPhone' }
          & Pick<UserByPhone, 'phone'>
        )>, byEmail?: Maybe<(
          { __typename?: 'UserByEmail' }
          & Pick<UserByEmail, 'email'>
        )>, fullAddress?: Maybe<(
          { __typename?: 'Address' }
          & Pick<Address, 'city' | 'country' | 'address' | 'zipcode'>
        )>, lifestyle?: Maybe<Array<Maybe<(
          { __typename?: 'Lifestyle' }
          & Pick<Lifestyle, 'uuid' | 'healthRating' | 'healthRating' | 'fitness' | 'smoking' | 'drinking' | 'nutrition' | 'drug' | 'diet'>
        )>>>, vaccines?: Maybe<Array<Maybe<(
          { __typename?: 'Vaccine' }
          & Pick<Vaccine, 'uuid' | 'name' | 'date'>
        )>>>, medicalHistory?: Maybe<Array<Maybe<(
          { __typename?: 'MedicalHistory' }
          & Pick<MedicalHistory, 'id_' | 'name' | 'date' | 'comment'>
        )>>>, medicalCondition?: Maybe<Array<Maybe<(
          { __typename?: 'MedicalConditionPatient' }
          & Pick<MedicalConditionPatient, 'uuid' | 'name' | 'startDate' | 'endDate'>
        )>>>, allergies?: Maybe<Array<Maybe<(
          { __typename?: 'Allergy' }
          & Pick<Allergy, 'uuid' | 'name' | 'date'>
        )>>>, family?: Maybe<(
          { __typename?: 'Family' }
          & Pick<Family, 'mother' | 'father' | 'grandparents'>
        )> }
      )> }
    )> }
  )> }
);

// export type Set_Basic_InfoMutationVariables = Exact<{
//   record: {
//     id: Scalars['ID'];
//     firstName?: Maybe<Scalars['String']>;
//     lastName?: Maybe<Scalars['String']>;
//     birthDate?: Maybe<Scalars['Date']>;
//     sex?: Maybe<SexEnum>;
//     address?: Maybe<AddressInput>;
//     language?: Maybe<Scalars['String']>;
//   }
// }>;


export type Set_Basic_InfoMutationVariables = Exact<{
  record: BasicInfoInput
}>;

export type BasicInfoInput = {
  id_: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  sex?: Maybe<SexEnum>;
  address?: Maybe<AddressInput>;
  language?: Maybe<Scalars['String']>;
};

export type Set_Basic_InfoMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { patientUser?: Maybe<(
      { __typename?: 'PatientUserMutations' }
      & { update?: Maybe<(
        { __typename?: 'UpdatePatient' }
        & Pick<UpdatePatient, 'resultId' | 'ok'>
        & { error?: Maybe<(
          { __typename?: 'Error' }
          & Pick<Error, 'message'>
        ) | (
          { __typename?: 'NotAvailableError' }
          & Pick<NotAvailableError, 'message'>
        ) | (
          { __typename?: 'NotFoundError' }
          & Pick<NotFoundError, 'message'>
        ) | (
          { __typename?: 'ServerError' }
          & Pick<ServerError, 'message'>
        ) | (
          { __typename?: 'TitleAlreadyTakenError' }
          & Pick<TitleAlreadyTakenError, 'message'>
        ) | (
          { __typename?: 'ValidationError' }
          & Pick<ValidationError, 'message'>
        )> }
      )> }
    )> }
  )> }
);

export type Update_AllergyMutationVariables = Exact<{
  patient: Scalars['ID'];
  record: AllergyUpdateInput;
}>;


export type Update_AllergyMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { patientUser?: Maybe<(
      { __typename?: 'PatientUserMutations' }
      & { allergy?: Maybe<(
        { __typename?: 'AllergyMutations' }
        & { update?: Maybe<(
          { __typename?: 'UpdateAllergy' }
          & Pick<UpdateAllergy, 'ok'>
          & { error?: Maybe<(
            { __typename?: 'Error' }
            & Pick<Error, 'message'>
          ) | (
            { __typename?: 'NotAvailableError' }
            & Pick<NotAvailableError, 'message'>
          ) | (
            { __typename?: 'NotFoundError' }
            & Pick<NotFoundError, 'message'>
          ) | (
            { __typename?: 'ServerError' }
            & Pick<ServerError, 'message'>
          ) | (
            { __typename?: 'TitleAlreadyTakenError' }
            & Pick<TitleAlreadyTakenError, 'message'>
          ) | (
            { __typename?: 'ValidationError' }
            & Pick<ValidationError, 'message'>
          )>, result?: Maybe<(
            { __typename?: 'Allergy' }
            & Pick<Allergy, 'uuid' | 'name' | 'date'>
          )> }
        )> }
      )> }
    )> }
  )> }
);

export type Update_FamilyMutationVariables = Exact<{
  patient: Scalars['ID'];
  record: FamilyInput;
}>;


export type Update_FamilyMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { patientUser?: Maybe<(
      { __typename?: 'PatientUserMutations' }
      & { updateFamily?: Maybe<(
        { __typename?: 'UpdateFamily' }
        & Pick<UpdateFamily, 'ok'>
        & { result?: Maybe<(
          { __typename?: 'PatientUser' }
          & { family?: Maybe<(
            { __typename?: 'Family' }
            & Pick<Family, 'mother' | 'father' | 'grandparents'>
          )> }
        )>, error?: Maybe<(
          { __typename?: 'Error' }
          & Pick<Error, 'message'>
        ) | (
          { __typename?: 'NotAvailableError' }
          & Pick<NotAvailableError, 'message'>
        ) | (
          { __typename?: 'NotFoundError' }
          & Pick<NotFoundError, 'message'>
        ) | (
          { __typename?: 'ServerError' }
          & Pick<ServerError, 'message'>
        ) | (
          { __typename?: 'TitleAlreadyTakenError' }
          & Pick<TitleAlreadyTakenError, 'message'>
        ) | (
          { __typename?: 'ValidationError' }
          & Pick<ValidationError, 'message'>
        )> }
      )> }
    )> }
  )> }
);

export type Update_VaccineMutationVariables = Exact<{
  patient: Scalars['ID'];
  record: VaccineUpdateInput;
}>;


export type Update_VaccineMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { patientUser?: Maybe<(
      { __typename?: 'PatientUserMutations' }
      & { vaccine?: Maybe<(
        { __typename?: 'VaccineMutations' }
        & { update?: Maybe<(
          { __typename?: 'UpdateVaccine' }
          & Pick<UpdateVaccine, 'ok'>
          & { error?: Maybe<(
            { __typename?: 'Error' }
            & Pick<Error, 'message'>
          ) | (
            { __typename?: 'NotAvailableError' }
            & Pick<NotAvailableError, 'message'>
          ) | (
            { __typename?: 'NotFoundError' }
            & Pick<NotFoundError, 'message'>
          ) | (
            { __typename?: 'ServerError' }
            & Pick<ServerError, 'message'>
          ) | (
            { __typename?: 'TitleAlreadyTakenError' }
            & Pick<TitleAlreadyTakenError, 'message'>
          ) | (
            { __typename?: 'ValidationError' }
            & Pick<ValidationError, 'message'>
          )>, result?: Maybe<(
            { __typename?: 'Vaccine' }
            & Pick<Vaccine, 'uuid' | 'name' | 'date'>
          )> }
        )> }
      )> }
    )> }
  )> }
);

export type Delete_AppointmentMutationVariables = Exact<{
  id_: Scalars['ID'];
}>;


export type Delete_AppointmentMutation = (
  { __typename?: 'Mutations' }
  & { schedule?: Maybe<(
    { __typename?: 'ScheduleMutations' }
    & { cancelAppointment?: Maybe<(
      { __typename?: 'CancelAppointment' }
      & Pick<CancelAppointment, 'ok' | 'resultId'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )> }
    )> }
  )> }
);

export type Delete_EventMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type Delete_EventMutation = (
  { __typename?: 'Mutations' }
  & { schedule?: Maybe<(
    { __typename?: 'ScheduleMutations' }
    & { cancelEvent?: Maybe<(
      { __typename?: 'CancelEvent' }
      & Pick<CancelEvent, 'ok' | 'resultId'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'code'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'code'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'code'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'code'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'code'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'code'>
      )>, result?: Maybe<(
        { __typename?: 'Event' }
        & { users?: Maybe<Array<Maybe<(
          { __typename?: 'UserWithStatus' }
          & Pick<UserWithStatus, 'status'>
        )>>> }
      )> }
    )> }
  )> }
);

export type Get_EventsQueryVariables = Exact<{
  filter: FilterFindManyAppointment;
}>;


export type Get_EventsQuery = (
  { __typename?: 'Queries' }
  & { schedule?: Maybe<(
    { __typename?: 'ScheduleQueries' }
    & { eventMany?: Maybe<(
      { __typename?: 'EventAndAppointmentPayload' }
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'Appointment' }
        & Pick<Appointment, 'id_' | 'title' | 'eventType' | 'startDate' | 'endDate' | 'createdAt' | 'isAppointment' | 'note' | 'isOnline'>
        & { location?: Maybe<(
          { __typename?: 'SubOrganization' }
          & Pick<SubOrganization, 'id_'>
        )>, createdBy?: Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'status' | 'id_' | 'firstName' | 'lastName' | 'sex' | 'birthDate'>
        )>, patient?: Maybe<(
          { __typename?: 'PatientWithStatus' }
          & Pick<PatientWithStatus, 'status' | 'id_' | 'firstName' | 'lastName' | 'sex' | 'birthDate'>
        )>, user?: Maybe<(
          { __typename?: 'UserWithStatus' }
          & Pick<UserWithStatus, 'status' | 'id_' | 'firstName' | 'lastName' | 'sex' | 'birthDate'>
        )> }
      ) | (
        { __typename?: 'Event' }
        & Pick<Event, 'id_' | 'title' | 'eventType' | 'startDate' | 'endDate' | 'createdAt' | 'isAppointment'>
        & { location?: Maybe<(
          { __typename?: 'SubOrganization' }
          & Pick<SubOrganization, 'id_'>
        )>, createdBy?: Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'status' | 'id_' | 'firstName' | 'lastName' | 'sex' | 'birthDate'>
        )>, patients?: Maybe<Array<Maybe<(
          { __typename?: 'PatientWithStatus' }
          & Pick<PatientWithStatus, 'status' | 'id_' | 'firstName' | 'lastName' | 'sex' | 'birthDate'>
        )>>>, users?: Maybe<Array<Maybe<(
          { __typename?: 'UserWithStatus' }
          & Pick<UserWithStatus, 'status' | 'id_' | 'firstName' | 'lastName' | 'sex' | 'birthDate'>
        )>>> }
      )>>> }
    )> }
  )> }
);

export type Get_Org_Unit_MembersQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  filter: FilterFindManyUserInput;
}>;


export type Get_Org_Unit_MembersQuery = (
  { __typename?: 'Queries' }
  & { user?: Maybe<(
    { __typename?: 'UserQueries' }
    & { dashboard?: Maybe<(
      { __typename?: 'DashboardUserQueries' }
      & { pagedList?: Maybe<(
        { __typename?: 'DashboardUserPagination' }
        & { items: Array<Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'firstName' | 'lastName'>
          & { orgUnit?: Maybe<(
            { __typename?: 'CareTeam' }
            & Pick<CareTeam, 'id_' | 'name'>
          ) | (
            { __typename?: 'SubOrganization' }
            & Pick<SubOrganization, 'id_' | 'name'>
          )> }
        )>>, pageInfo: (
          { __typename?: 'PaginationInfo' }
          & Pick<PaginationInfo, 'page' | 'perPage' | 'hasNextPage'>
        ) }
      )> }
    )> }
  )> }
);

export type Reschedule_AppointmentMutationVariables = Exact<{
  id_: Scalars['GrapheneMongoId'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
}>;


export type Reschedule_AppointmentMutation = (
  { __typename?: 'Mutations' }
  & { schedule?: Maybe<(
    { __typename?: 'ScheduleMutations' }
    & { rescheduleAppointment?: Maybe<(
      { __typename?: 'RescheduleAppointment' }
      & Pick<RescheduleAppointment, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'Appointment' }
        & Pick<Appointment, 'id_' | 'startDate' | 'endDate'>
      )> }
    )> }
  )> }
);

export type Reschedule_EventMutationVariables = Exact<{
  id_: Scalars['GrapheneMongoId'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
}>;


export type Reschedule_EventMutation = (
  { __typename?: 'Mutations' }
  & { schedule?: Maybe<(
    { __typename?: 'ScheduleMutations' }
    & { rescheduleEvent?: Maybe<(
      { __typename?: 'RescheduleEvent' }
      & Pick<RescheduleEvent, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'id_' | 'startDate' | 'endDate'>
      )> }
    )> }
  )> }
);

export type Update_AppointmentMutationVariables = Exact<{
  recordAppointment: UpdateAppointmentInput;
  recordReschedule: RescheduleAppointmentInput;
}>;


export type Update_AppointmentMutation = (
  { __typename?: 'Mutations' }
  & { schedule?: Maybe<(
    { __typename?: 'ScheduleMutations' }
    & { updateAppointment?: Maybe<(
      { __typename?: 'UpdateAppointment' }
      & Pick<UpdateAppointment, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'Appointment' }
        & Pick<Appointment, 'id_' | 'title' | 'isOnline' | 'eventType' | 'createdAt' | 'isAppointment' | 'note' | 'endDate' | 'startDate'>
        & { createdBy?: Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'firstName' | 'lastName' | 'status' | 'sex' | 'birthDate'>
        )>, location?: Maybe<(
          { __typename?: 'SubOrganization' }
          & Pick<SubOrganization, 'id_'>
        )>, patient?: Maybe<(
          { __typename?: 'PatientWithStatus' }
          & Pick<PatientWithStatus, 'status' | 'id_' | 'firstName' | 'lastName' | 'sex' | 'birthDate'>
        )>, user?: Maybe<(
          { __typename?: 'UserWithStatus' }
          & Pick<UserWithStatus, 'status' | 'id_' | 'firstName' | 'lastName' | 'sex' | 'birthDate'>
        )> }
      )> }
    )>, rescheduleAppointment?: Maybe<(
      { __typename?: 'RescheduleAppointment' }
      & Pick<RescheduleAppointment, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'Appointment' }
        & Pick<Appointment, 'id_' | 'startDate' | 'endDate'>
      )> }
    )> }
  )> }
);

export type Update_EventMutationVariables = Exact<{
  recordEvent: UpdateEventInput;
  recordReschedule: RescheduleEventInput;
}>;


export type Update_EventMutation = (
  { __typename?: 'Mutations' }
  & { schedule?: Maybe<(
    { __typename?: 'ScheduleMutations' }
    & { updateEvent?: Maybe<(
      { __typename?: 'UpdateEvent' }
      & Pick<UpdateEvent, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'id_' | 'title' | 'eventType' | 'createdAt' | 'isAppointment' | 'endDate' | 'startDate'>
        & { createdBy?: Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'firstName' | 'lastName' | 'status' | 'sex' | 'birthDate'>
        )>, location?: Maybe<(
          { __typename?: 'SubOrganization' }
          & Pick<SubOrganization, 'id_'>
        )>, patients?: Maybe<Array<Maybe<(
          { __typename?: 'PatientWithStatus' }
          & Pick<PatientWithStatus, 'id_' | 'firstName' | 'lastName'>
        )>>>, users?: Maybe<Array<Maybe<(
          { __typename?: 'UserWithStatus' }
          & Pick<UserWithStatus, 'id_' | 'firstName' | 'lastName' | 'sex' | 'status' | 'birthDate'>
        )>>> }
      )> }
    )>, rescheduleEvent?: Maybe<(
      { __typename?: 'RescheduleEvent' }
      & Pick<RescheduleEvent, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'id_' | 'startDate' | 'endDate'>
      )> }
    )> }
  )> }
);

export type Add_UsersMutationVariables = Exact<{
  record: AddUserToOrgUnitInput;
}>;


export type Add_UsersMutation = (
  { __typename?: 'Mutations' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitMutations' }
    & { addUsers?: Maybe<(
      { __typename?: 'AddUserToOrgUnit' }
      & Pick<AddUserToOrgUnit, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'CareTeam' }
        & { users?: Maybe<Array<Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'lastName' | 'firstName' | 'role'>
          & { byEmail?: Maybe<(
            { __typename?: 'UserByEmail' }
            & Pick<UserByEmail, 'email'>
          )>, byPhone?: Maybe<(
            { __typename?: 'UserByPhone' }
            & Pick<UserByPhone, 'phone'>
          )>, orgUnit?: Maybe<(
            { __typename: 'CareTeam' }
            & Pick<CareTeam, 'id_' | 'name'>
            & { subOrg?: Maybe<(
              { __typename?: 'SubOrganization' }
              & Pick<SubOrganization, 'id_' | 'name'>
            )> }
          ) | (
            { __typename: 'SubOrganization' }
            & Pick<SubOrganization, 'id_' | 'name'>
          )> }
        )>>> }
      ) | (
        { __typename?: 'SubOrganization' }
        & { users?: Maybe<Array<Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'lastName' | 'firstName' | 'role'>
          & { byEmail?: Maybe<(
            { __typename?: 'UserByEmail' }
            & Pick<UserByEmail, 'email'>
          )>, byPhone?: Maybe<(
            { __typename?: 'UserByPhone' }
            & Pick<UserByPhone, 'phone'>
          )>, orgUnit?: Maybe<(
            { __typename: 'CareTeam' }
            & Pick<CareTeam, 'id_' | 'name'>
            & { subOrg?: Maybe<(
              { __typename?: 'SubOrganization' }
              & Pick<SubOrganization, 'id_' | 'name'>
            )> }
          ) | (
            { __typename: 'SubOrganization' }
            & Pick<SubOrganization, 'id_' | 'name'>
          )> }
        )>>> }
      )> }
    )> }
  )> }
);

export type Create_Sub_OrgMutationVariables = Exact<{
  record: SubOrgCreateInput;
}>;


export type Create_Sub_OrgMutation = (
  { __typename?: 'Mutations' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitMutations' }
    & { createSubOrg?: Maybe<(
      { __typename?: 'CreateSubOrg' }
      & Pick<CreateSubOrg, 'ok' | 'resultId'>
      & { result?: Maybe<(
        { __typename?: 'SubOrganization' }
        & Pick<SubOrganization, 'name'>
      )>, error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )> }
    )> }
  )> }
);

export type Delete_Care_TeamMutationVariables = Exact<{
  id_: Scalars['ID'];
}>;


export type Delete_Care_TeamMutation = (
  { __typename?: 'Mutations' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitMutations' }
    & { deleteCareTeam?: Maybe<(
      { __typename?: 'DeleteCareTeam' }
      & Pick<DeleteCareTeam, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )> }
    )> }
  )> }
);

export type Delete_Dashboard_UserMutationVariables = Exact<{
  id_: Scalars['ID'];
}>;


export type Delete_Dashboard_UserMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { dashboardUser?: Maybe<(
      { __typename?: 'DashboardUserMutations' }
      & { delete?: Maybe<(
        { __typename?: 'DeleteUser' }
        & Pick<DeleteUser, 'ok'>
        & { error?: Maybe<(
          { __typename?: 'Error' }
          & Pick<Error, 'message'>
        ) | (
          { __typename?: 'NotAvailableError' }
          & Pick<NotAvailableError, 'message'>
        ) | (
          { __typename?: 'NotFoundError' }
          & Pick<NotFoundError, 'message'>
        ) | (
          { __typename?: 'ServerError' }
          & Pick<ServerError, 'message'>
        ) | (
          { __typename?: 'TitleAlreadyTakenError' }
          & Pick<TitleAlreadyTakenError, 'message'>
        ) | (
          { __typename?: 'ValidationError' }
          & Pick<ValidationError, 'message'>
        )> }
      )> }
    )> }
  )> }
);

export type Delete_Sub_OrgMutationVariables = Exact<{
  id_: Scalars['ID'];
}>;


export type Delete_Sub_OrgMutation = (
  { __typename?: 'Mutations' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitMutations' }
    & { deleteSubOrg?: Maybe<(
      { __typename?: 'DeleteSubOrg' }
      & Pick<DeleteSubOrg, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )> }
    )> }
  )> }
);

export type Delete_Users_In_Org_UnitMutationVariables = Exact<{
  record: AddUserToOrgUnitInput;
}>;


export type Delete_Users_In_Org_UnitMutation = (
  { __typename?: 'Mutations' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitMutations' }
    & { deleteUsers?: Maybe<(
      { __typename?: 'DeleteUserFromOrgUnit' }
      & Pick<DeleteUserFromOrgUnit, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'CareTeam' }
        & Pick<CareTeam, 'id_' | 'name'>
      ) | (
        { __typename?: 'SubOrganization' }
        & Pick<SubOrganization, 'id_' | 'name'>
      )> }
    )> }
  )> }
);

export type Get_Care_TeamsQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  filter?: Maybe<FilterFindManyCareTeam>;
}>;


export type Get_Care_TeamsQuery = (
  { __typename?: 'Queries' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitQueries' }
    & { careTeamPagination?: Maybe<(
      { __typename?: 'CareTeamPagination' }
      & { items: Array<Maybe<(
        { __typename?: 'CareTeam' }
        & Pick<CareTeam, 'id_' | 'name'>
        & { subOrg?: Maybe<(
          { __typename?: 'SubOrganization' }
          & Pick<SubOrganization, 'id_' | 'name'>
        )>, supervisors?: Maybe<Array<Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'firstName' | 'sex' | 'lastName' | 'birthDate'>
        )>>>, users?: Maybe<Array<Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_'>
        )>>> }
      )>>, pageInfo: (
        { __typename?: 'PaginationInfo' }
        & Pick<PaginationInfo, 'totalPages' | 'totalItems' | 'page' | 'perPage' | 'hasNextPage'>
      ) }
    )> }
  )> }
);

export type Get_Care_Teams_For_AutocompleteQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  filter?: Maybe<FilterFindManyCareTeam>;
}>;


export type Get_Care_Teams_For_AutocompleteQuery = (
  { __typename?: 'Queries' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitQueries' }
    & { careTeamPagination?: Maybe<(
      { __typename?: 'CareTeamPagination' }
      & { items: Array<Maybe<(
        { __typename?: 'CareTeam' }
        & Pick<CareTeam, 'id_' | 'name'>
        & { subOrg?: Maybe<(
          { __typename?: 'SubOrganization' }
          & Pick<SubOrganization, 'id_'>
        )> }
      )>>, pageInfo: (
        { __typename?: 'PaginationInfo' }
        & Pick<PaginationInfo, 'totalPages' | 'totalItems' | 'page' | 'perPage' | 'hasNextPage' | 'hasPreviousPage'>
      ) }
    )> }
  )> }
);

export type Get_Master_Org_InfoQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Master_Org_InfoQuery = (
  { __typename?: 'Queries' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitQueries' }
    & { masterOrgMe?: Maybe<(
      { __typename?: 'MasterOrganization' }
      & Pick<MasterOrganization, 'name' | 'phone' | 'email' | 'site' | 'isDefaultWorkingHours' | 'logo' | 'created' | 'language' | 'facebook' | 'linkedin' | 'instagram' | 'description'>
      & { fullAddress?: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'country' | 'city' | 'address' | 'zipcode'>
      )>, workingHours?: Maybe<Array<Maybe<(
        { __typename?: 'WorkingHours' }
        & Pick<WorkingHours, 'dayOfWeek' | 'startTime' | 'endTime' | 'startLunchTime' | 'endLunchTime'>
      )>>> }
    )> }
  )> }
);

export type Get_Sub_OrgsQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  filter?: Maybe<FilterFindManyOrgUnit>;
}>;


export type Get_Sub_OrgsQuery = (
  { __typename?: 'Queries' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitQueries' }
    & { subOrgPagination?: Maybe<(
      { __typename?: 'SubOrgPagination' }
      & { items: Array<Maybe<(
        { __typename?: 'SubOrganization' }
        & Pick<SubOrganization, 'id_' | 'name' | 'email' | 'phone' | 'site'>
        & { supervisors?: Maybe<Array<Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'firstName' | 'sex' | 'lastName' | 'birthDate'>
        )>>>, users?: Maybe<Array<Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_'>
        )>>>, careTeams?: Maybe<Array<Maybe<(
          { __typename?: 'CareTeam' }
          & Pick<CareTeam, 'id_' | 'name'>
        )>>>, fullAddress?: Maybe<(
          { __typename?: 'Address' }
          & Pick<Address, 'address' | 'zipcode' | 'city' | 'country'>
        )> }
      )>>, pageInfo: (
        { __typename?: 'PaginationInfo' }
        & Pick<PaginationInfo, 'totalPages' | 'totalItems' | 'page' | 'perPage' | 'hasNextPage'>
      ) }
    )> }
  )> }
);

export type Get_Sub_Orgs_For_AutocompleteQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  filter?: Maybe<FilterFindManyOrgUnit>;
}>;


export type Get_Sub_Orgs_For_AutocompleteQuery = (
  { __typename?: 'Queries' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitQueries' }
    & { subOrgPagination?: Maybe<(
      { __typename?: 'SubOrgPagination' }
      & { items: Array<Maybe<(
        { __typename?: 'SubOrganization' }
        & Pick<SubOrganization, 'id_' | 'name'>
        & { careTeams?: Maybe<Array<Maybe<(
          { __typename?: 'CareTeam' }
          & Pick<CareTeam, 'id_' | 'name'>
        )>>> }
      )>>, pageInfo: (
        { __typename?: 'PaginationInfo' }
        & Pick<PaginationInfo, 'totalPages' | 'totalItems' | 'page' | 'perPage' | 'hasNextPage' | 'hasPreviousPage'>
      ) }
    )> }
  )> }
);

export type Get_Dashboard_UsersQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  filter?: Maybe<FilterFindManyUserInput>;
}>;


export type Get_Dashboard_UsersQuery = (
  { __typename?: 'Queries' }
  & { user?: Maybe<(
    { __typename?: 'UserQueries' }
    & { dashboard?: Maybe<(
      { __typename?: 'DashboardUserQueries' }
      & { pagedList?: Maybe<(
        { __typename?: 'DashboardUserPagination' }
        & { items: Array<Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'firstName' | 'lastName' | 'role'>
          & { orgUnit?: Maybe<(
            { __typename: 'CareTeam' }
            & Pick<CareTeam, 'id_' | 'name'>
            & { subOrg?: Maybe<(
              { __typename?: 'SubOrganization' }
              & Pick<SubOrganization, 'id_' | 'name'>
            )> }
          ) | (
            { __typename: 'SubOrganization' }
            & Pick<SubOrganization, 'id_' | 'name'>
          )>, byEmail?: Maybe<(
            { __typename?: 'UserByEmail' }
            & Pick<UserByEmail, 'email'>
          )> }
        )>>, pageInfo: (
          { __typename?: 'PaginationInfo' }
          & Pick<PaginationInfo, 'perPage' | 'page' | 'totalItems' | 'totalPages'>
        ) }
      )> }
    )> }
  )> }
);

export type Get_Dashboard_Users_For_AutocompleteQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  filter?: Maybe<FilterFindManyUserInput>;
}>;


export type Get_Dashboard_Users_For_AutocompleteQuery = (
  { __typename?: 'Queries' }
  & { user?: Maybe<(
    { __typename?: 'UserQueries' }
    & { dashboard?: Maybe<(
      { __typename?: 'DashboardUserQueries' }
      & { pagedList?: Maybe<(
        { __typename?: 'DashboardUserPagination' }
        & { items: Array<Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'firstName' | 'lastName'>
        )>>, pageInfo: (
          { __typename?: 'PaginationInfo' }
          & Pick<PaginationInfo, 'perPage' | 'page' | 'totalItems' | 'totalPages' | 'hasNextPage'>
        ) }
      )> }
    )> }
  )> }
);

export type Update_Dashboard_UserMutationVariables = Exact<{
  record: DashboardUserUpdateInput;
  user: Scalars['ID'];
}>;


export type Update_Dashboard_UserMutation = (
  { __typename?: 'Mutations' }
  & { user?: Maybe<(
    { __typename?: 'UserMutations' }
    & { dashboardUser?: Maybe<(
      { __typename?: 'DashboardUserMutations' }
      & { update?: Maybe<(
        { __typename?: 'UpdateDashboardUser' }
        & Pick<UpdateDashboardUser, 'ok'>
        & { error?: Maybe<(
          { __typename?: 'Error' }
          & Pick<Error, 'message'>
        ) | (
          { __typename?: 'NotAvailableError' }
          & Pick<NotAvailableError, 'message'>
        ) | (
          { __typename?: 'NotFoundError' }
          & Pick<NotFoundError, 'message'>
        ) | (
          { __typename?: 'ServerError' }
          & Pick<ServerError, 'message'>
        ) | (
          { __typename?: 'TitleAlreadyTakenError' }
          & Pick<TitleAlreadyTakenError, 'message'>
        ) | (
          { __typename?: 'ValidationError' }
          & Pick<ValidationError, 'message'>
        )>, result?: Maybe<(
          { __typename?: 'DashboardUser' }
          & Pick<DashboardUser, 'id_' | 'firstName' | 'lastName' | 'role'>
          & { orgUnit?: Maybe<(
            { __typename: 'CareTeam' }
            & Pick<CareTeam, 'id_' | 'name'>
            & { subOrg?: Maybe<(
              { __typename?: 'SubOrganization' }
              & Pick<SubOrganization, 'id_' | 'name'>
            )> }
          ) | (
            { __typename: 'SubOrganization' }
            & Pick<SubOrganization, 'id_' | 'name'>
          )> }
        )> }
      )> }
    )> }
  )> }
);

export type Update_Master_OrgMutationVariables = Exact<{
  record: MasterOrgUpdateInput;
}>;


export type Update_Master_OrgMutation = (
  { __typename?: 'Mutations' }
  & { orgUnit?: Maybe<(
    { __typename?: 'OrgUnitMutations' }
    & { updateMasterOrg?: Maybe<(
      { __typename?: 'UpdateMasterOrg' }
      & Pick<UpdateMasterOrg, 'ok'>
      & { error?: Maybe<(
        { __typename?: 'Error' }
        & Pick<Error, 'message'>
      ) | (
        { __typename?: 'NotAvailableError' }
        & Pick<NotAvailableError, 'message'>
      ) | (
        { __typename?: 'NotFoundError' }
        & Pick<NotFoundError, 'message'>
      ) | (
        { __typename?: 'ServerError' }
        & Pick<ServerError, 'message'>
      ) | (
        { __typename?: 'TitleAlreadyTakenError' }
        & Pick<TitleAlreadyTakenError, 'message'>
      ) | (
        { __typename?: 'ValidationError' }
        & Pick<ValidationError, 'message'>
      )>, result?: Maybe<(
        { __typename?: 'SubOrganization' }
        & Pick<SubOrganization, 'name'>
      )> }
    )> }
  )> }
);


export const Get_Care_PlansDocument = gql`
    query GET_CARE_PLANS($type: GqlCarePlanType, $page: Int!, $pageSize: Int!) {
  carePlan {
    list(type: $type, page: $page, perPage: $pageSize) {
      items {
        id_
        name
        subtitle
        description
        image
        durationMonths
        durationWeeks
        durationDays
        authorId
        tags
        revision
        status
      }
      pageInfo {
        totalPages
        totalItems
        page
        perPage
        hasNextPage
      }
    }
  }
}
    `;

/**
 * __useGet_Care_PlansQuery__
 *
 * To run a query within a React component, call `useGet_Care_PlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Care_PlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Care_PlansQuery({
 *   variables: {
 *      type: // value for 'type'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGet_Care_PlansQuery(baseOptions: Apollo.QueryHookOptions<Get_Care_PlansQuery, Get_Care_PlansQueryVariables>) {
        return Apollo.useQuery<Get_Care_PlansQuery, Get_Care_PlansQueryVariables>(Get_Care_PlansDocument, baseOptions);
      }
export function useGet_Care_PlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Care_PlansQuery, Get_Care_PlansQueryVariables>) {
          return Apollo.useLazyQuery<Get_Care_PlansQuery, Get_Care_PlansQueryVariables>(Get_Care_PlansDocument, baseOptions);
        }
export type Get_Care_PlansQueryHookResult = ReturnType<typeof useGet_Care_PlansQuery>;
export type Get_Care_PlansLazyQueryHookResult = ReturnType<typeof useGet_Care_PlansLazyQuery>;
export type Get_Care_PlansQueryResult = Apollo.QueryResult<Get_Care_PlansQuery, Get_Care_PlansQueryVariables>;
export const Get_One_Care_PlanDocument = gql`
    query GET_ONE_CARE_PLAN($type: GqlCarePlanType, $id_: ID) {
  carePlan {
    one(id_: $id_, type: $type) {
      id_
      name
      subtitle
      description
      image
      durationMonths
      durationWeeks
      durationDays
      authorId
      tags
      revision
      status
      awsStateMachineArn
      uiJson
    }
  }
}
    `;

/**
 * __useGet_One_Care_PlanQuery__
 *
 * To run a query within a React component, call `useGet_One_Care_PlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_One_Care_PlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_One_Care_PlanQuery({
 *   variables: {
 *      type: // value for 'type'
 *      id_: // value for 'id_'
 *   },
 * });
 */
export function useGet_One_Care_PlanQuery(baseOptions?: Apollo.QueryHookOptions<Get_One_Care_PlanQuery, Get_One_Care_PlanQueryVariables>) {
        return Apollo.useQuery<Get_One_Care_PlanQuery, Get_One_Care_PlanQueryVariables>(Get_One_Care_PlanDocument, baseOptions);
      }
export function useGet_One_Care_PlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_One_Care_PlanQuery, Get_One_Care_PlanQueryVariables>) {
          return Apollo.useLazyQuery<Get_One_Care_PlanQuery, Get_One_Care_PlanQueryVariables>(Get_One_Care_PlanDocument, baseOptions);
        }
export type Get_One_Care_PlanQueryHookResult = ReturnType<typeof useGet_One_Care_PlanQuery>;
export type Get_One_Care_PlanLazyQueryHookResult = ReturnType<typeof useGet_One_Care_PlanLazyQuery>;
export type Get_One_Care_PlanQueryResult = Apollo.QueryResult<Get_One_Care_PlanQuery, Get_One_Care_PlanQueryVariables>;
export const Load_Care_Plan_JsonDocument = gql`
    mutation LOAD_CARE_PLAN_JSON($id_: ID, $type: GqlCarePlanType!, $uiJson: String) {
  carePlan {
    loadJson(id_: $id_, type: $type, uiJson: $uiJson) {
      ok
      error {
        message
      }
      result {
        id_
        name
        subtitle
        uiJson
      }
    }
  }
}
    `;
export type Load_Care_Plan_JsonMutationFn = Apollo.MutationFunction<Load_Care_Plan_JsonMutation, Load_Care_Plan_JsonMutationVariables>;

/**
 * __useLoad_Care_Plan_JsonMutation__
 *
 * To run a mutation, you first call `useLoad_Care_Plan_JsonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoad_Care_Plan_JsonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loadCarePlanJsonMutation, { data, loading, error }] = useLoad_Care_Plan_JsonMutation({
 *   variables: {
 *      id_: // value for 'id_'
 *      type: // value for 'type'
 *      uiJson: // value for 'uiJson'
 *   },
 * });
 */
export function useLoad_Care_Plan_JsonMutation(baseOptions?: Apollo.MutationHookOptions<Load_Care_Plan_JsonMutation, Load_Care_Plan_JsonMutationVariables>) {
        return Apollo.useMutation<Load_Care_Plan_JsonMutation, Load_Care_Plan_JsonMutationVariables>(Load_Care_Plan_JsonDocument, baseOptions);
      }
export type Load_Care_Plan_JsonMutationHookResult = ReturnType<typeof useLoad_Care_Plan_JsonMutation>;
export type Load_Care_Plan_JsonMutationResult = Apollo.MutationResult<Load_Care_Plan_JsonMutation>;
export type Load_Care_Plan_JsonMutationOptions = Apollo.BaseMutationOptions<Load_Care_Plan_JsonMutation, Load_Care_Plan_JsonMutationVariables>;
export const Run_Care_PlanDocument = gql`
    mutation RUN_CARE_PLAN($carePlanId: ID!, $patientId: ID!) {
  carePlan {
    runCarePlan(carePlanId: $carePlanId, patientId: $patientId) {
      ok
      error {
        message
      }
      assignmentId
    }
  }
}
    `;
export type Run_Care_PlanMutationFn = Apollo.MutationFunction<Run_Care_PlanMutation, Run_Care_PlanMutationVariables>;

/**
 * __useRun_Care_PlanMutation__
 *
 * To run a mutation, you first call `useRun_Care_PlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRun_Care_PlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runCarePlanMutation, { data, loading, error }] = useRun_Care_PlanMutation({
 *   variables: {
 *      carePlanId: // value for 'carePlanId'
 *      patientId: // value for 'patientId'
 *   },
 * });
 */
export function useRun_Care_PlanMutation(baseOptions?: Apollo.MutationHookOptions<Run_Care_PlanMutation, Run_Care_PlanMutationVariables>) {
        return Apollo.useMutation<Run_Care_PlanMutation, Run_Care_PlanMutationVariables>(Run_Care_PlanDocument, baseOptions);
      }
export type Run_Care_PlanMutationHookResult = ReturnType<typeof useRun_Care_PlanMutation>;
export type Run_Care_PlanMutationResult = Apollo.MutationResult<Run_Care_PlanMutation>;
export type Run_Care_PlanMutationOptions = Apollo.BaseMutationOptions<Run_Care_PlanMutation, Run_Care_PlanMutationVariables>;
export const Save_Care_Plan_SettingsDocument = gql`
    mutation SAVE_CARE_PLAN_SETTINGS($data: CarePlanInput!, $type: GqlCarePlanType!) {
  carePlan {
    create(data: $data, type: $type) {
      ok
      error {
        message
      }
      resultId
    }
  }
}
    `;
export type Save_Care_Plan_SettingsMutationFn = Apollo.MutationFunction<Save_Care_Plan_SettingsMutation, Save_Care_Plan_SettingsMutationVariables>;

/**
 * __useSave_Care_Plan_SettingsMutation__
 *
 * To run a mutation, you first call `useSave_Care_Plan_SettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSave_Care_Plan_SettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCarePlanSettingsMutation, { data, loading, error }] = useSave_Care_Plan_SettingsMutation({
 *   variables: {
 *      data: // value for 'data'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSave_Care_Plan_SettingsMutation(baseOptions?: Apollo.MutationHookOptions<Save_Care_Plan_SettingsMutation, Save_Care_Plan_SettingsMutationVariables>) {
        return Apollo.useMutation<Save_Care_Plan_SettingsMutation, Save_Care_Plan_SettingsMutationVariables>(Save_Care_Plan_SettingsDocument, baseOptions);
      }
export type Save_Care_Plan_SettingsMutationHookResult = ReturnType<typeof useSave_Care_Plan_SettingsMutation>;
export type Save_Care_Plan_SettingsMutationResult = Apollo.MutationResult<Save_Care_Plan_SettingsMutation>;
export type Save_Care_Plan_SettingsMutationOptions = Apollo.BaseMutationOptions<Save_Care_Plan_SettingsMutation, Save_Care_Plan_SettingsMutationVariables>;
export const Update_Care_Plan_SettingsDocument = gql`
    mutation UPDATE_CARE_PLAN_SETTINGS($type: GqlCarePlanType!, $data: CarePlanInput!) {
  carePlan {
    update(type: $type, data: $data) {
      ok
      error {
        message
      }
      resultId
      result {
        id_
        name
        subtitle
        description
        image
        durationMonths
        durationWeeks
        durationDays
        authorId
        tags
        revision
        status
        awsStateMachineArn
        uiJson
      }
    }
  }
}
    `;
export type Update_Care_Plan_SettingsMutationFn = Apollo.MutationFunction<Update_Care_Plan_SettingsMutation, Update_Care_Plan_SettingsMutationVariables>;

/**
 * __useUpdate_Care_Plan_SettingsMutation__
 *
 * To run a mutation, you first call `useUpdate_Care_Plan_SettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_Care_Plan_SettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarePlanSettingsMutation, { data, loading, error }] = useUpdate_Care_Plan_SettingsMutation({
 *   variables: {
 *      type: // value for 'type'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdate_Care_Plan_SettingsMutation(baseOptions?: Apollo.MutationHookOptions<Update_Care_Plan_SettingsMutation, Update_Care_Plan_SettingsMutationVariables>) {
        return Apollo.useMutation<Update_Care_Plan_SettingsMutation, Update_Care_Plan_SettingsMutationVariables>(Update_Care_Plan_SettingsDocument, baseOptions);
      }
export type Update_Care_Plan_SettingsMutationHookResult = ReturnType<typeof useUpdate_Care_Plan_SettingsMutation>;
export type Update_Care_Plan_SettingsMutationResult = Apollo.MutationResult<Update_Care_Plan_SettingsMutation>;
export type Update_Care_Plan_SettingsMutationOptions = Apollo.BaseMutationOptions<Update_Care_Plan_SettingsMutation, Update_Care_Plan_SettingsMutationVariables>;
export const Add_LifestyleDocument = gql`
mutation ADD_LIFESTYLE($patient: ID!, $record: LifestyleInput!) {
  user {
    patientUser {
      lifestyle {
        add(patient: $patient, record: $record) {
          ok
          error {
            message
          }
          result {
            uuid
            healthRating
            sleepHealth
            fitness
            smoking
            drinking
            nutrition
            drug
            diet
          }
        }
      }
    }
  }
}
`;
export type Add_LifestyleMutationFn = Apollo.MutationFunction<Add_LifestyleMutation, Add_LifestyleMutationVariables>;
export function useAdd_LifestyleMutation(baseOptions?: Apollo.MutationHookOptions<Add_LifestyleMutation, Add_LifestyleMutationVariables>) {
  return Apollo.useMutation<Add_LifestyleMutation, Add_LifestyleMutationVariables>(Add_LifestyleDocument, baseOptions);
}
export type Add_LifestyleMutationHookResult = ReturnType<typeof useAdd_LifestyleMutation>;
export type Add_LifestyleMutationResult = Apollo.MutationResult<Add_LifestyleMutation>;
export type Add_LifestyleMutationOptions = Apollo.BaseMutationOptions<Add_LifestyleMutation, Add_LifestyleMutationVariables>;
export const Add_AllergyDocument = gql`
    mutation ADD_ALLERGY($patient: ID!, $record: AllergyInput!) {
  user {
    patientUser {
      allergy {
        add(patient: $patient, record: $record) {
          ok
          error {
            message
          }
          result {
            category
            substance
            reactionTask
            severity
            certainty
            comment
          }
        }
      }
    }
  }
}
    `;
export type Add_AllergyMutationFn = Apollo.MutationFunction<Add_AllergyMutation, Add_AllergyMutationVariables>;

/**
 * __useAdd_AllergyMutation__
 *
 * To run a mutation, you first call `useAdd_AllergyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdd_AllergyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAllergyMutation, { data, loading, error }] = useAdd_AllergyMutation({
 *   variables: {
 *      patient: // value for 'patient'
 *      record: // value for 'record'
 *   },
 * });
 */
export function useAdd_AllergyMutation(baseOptions?: Apollo.MutationHookOptions<Add_AllergyMutation, Add_AllergyMutationVariables>) {
        return Apollo.useMutation<Add_AllergyMutation, Add_AllergyMutationVariables>(Add_AllergyDocument, baseOptions);
      }
export type Add_AllergyMutationHookResult = ReturnType<typeof useAdd_AllergyMutation>;
export type Add_AllergyMutationResult = Apollo.MutationResult<Add_AllergyMutation>;
export type Add_AllergyMutationOptions = Apollo.BaseMutationOptions<Add_AllergyMutation, Add_AllergyMutationVariables>;
export const Add_VaccineDocument = gql`
    mutation ADD_VACCINE($patient: ID!, $record: VaccineInput!) {
  user {
    patientUser {
      vaccine {
        add(patient: $patient, record: $record) {
          ok
          error {
            message
          }
          result {
            uuid
            name
            date
          }
        }
      }
    }
  }
}
    `;
export type Add_VaccineMutationFn = Apollo.MutationFunction<Add_VaccineMutation, Add_VaccineMutationVariables>;

/**
 * __useAdd_VaccineMutation__
 *
 * To run a mutation, you first call `useAdd_VaccineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdd_VaccineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVaccineMutation, { data, loading, error }] = useAdd_VaccineMutation({
 *   variables: {
 *      patient: // value for 'patient'
 *      record: // value for 'record'
 *   },
 * });
 */
export function useAdd_VaccineMutation(baseOptions?: Apollo.MutationHookOptions<Add_VaccineMutation, Add_VaccineMutationVariables>) {
        return Apollo.useMutation<Add_VaccineMutation, Add_VaccineMutationVariables>(Add_VaccineDocument, baseOptions);
      }
export type Add_VaccineMutationHookResult = ReturnType<typeof useAdd_VaccineMutation>;
export type Add_VaccineMutationResult = Apollo.MutationResult<Add_VaccineMutation>;
export type Add_VaccineMutationOptions = Apollo.BaseMutationOptions<Add_VaccineMutation, Add_VaccineMutationVariables>;
export const Delete_AllergyDocument = gql`
    mutation DELETE_ALLERGY($patient: ID!, $allergyUuid: UUID!) {
  user {
    patientUser {
      allergy {
        delete(patient: $patient, allergyUuid: $allergyUuid) {
          ok
          error {
            message
          }
        }
      }
    }
  }
}
    `;
export type Delete_AllergyMutationFn = Apollo.MutationFunction<Delete_AllergyMutation, Delete_AllergyMutationVariables>;

/**
 * __useDelete_AllergyMutation__
 *
 * To run a mutation, you first call `useDelete_AllergyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_AllergyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAllergyMutation, { data, loading, error }] = useDelete_AllergyMutation({
 *   variables: {
 *      patient: // value for 'patient'
 *      allergyUuid: // value for 'allergyUuid'
 *   },
 * });
 */
export function useDelete_AllergyMutation(baseOptions?: Apollo.MutationHookOptions<Delete_AllergyMutation, Delete_AllergyMutationVariables>) {
        return Apollo.useMutation<Delete_AllergyMutation, Delete_AllergyMutationVariables>(Delete_AllergyDocument, baseOptions);
      }
export type Delete_AllergyMutationHookResult = ReturnType<typeof useDelete_AllergyMutation>;
export type Delete_AllergyMutationResult = Apollo.MutationResult<Delete_AllergyMutation>;
export type Delete_AllergyMutationOptions = Apollo.BaseMutationOptions<Delete_AllergyMutation, Delete_AllergyMutationVariables>;
export const Delete_VaccineDocument = gql`
    mutation DELETE_VACCINE($patient: ID!, $vaccineUuid: UUID!) {
  user {
    patientUser {
      vaccine {
        delete(patient: $patient, vaccineUuid: $vaccineUuid) {
          ok
          error {
            message
          }
        }
      }
    }
  }
}
    `;
export type Delete_VaccineMutationFn = Apollo.MutationFunction<Delete_VaccineMutation, Delete_VaccineMutationVariables>;

/**
 * __useDelete_VaccineMutation__
 *
 * To run a mutation, you first call `useDelete_VaccineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_VaccineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVaccineMutation, { data, loading, error }] = useDelete_VaccineMutation({
 *   variables: {
 *      patient: // value for 'patient'
 *      vaccineUuid: // value for 'vaccineUuid'
 *   },
 * });
 */
export function useDelete_VaccineMutation(baseOptions?: Apollo.MutationHookOptions<Delete_VaccineMutation, Delete_VaccineMutationVariables>) {
        return Apollo.useMutation<Delete_VaccineMutation, Delete_VaccineMutationVariables>(Delete_VaccineDocument, baseOptions);
      }
export type Delete_VaccineMutationHookResult = ReturnType<typeof useDelete_VaccineMutation>;
export type Delete_VaccineMutationResult = Apollo.MutationResult<Delete_VaccineMutation>;
export type Delete_VaccineMutationOptions = Apollo.BaseMutationOptions<Delete_VaccineMutation, Delete_VaccineMutationVariables>;
export const Get_Patient_By_IdDocument = gql`
    query GET_PATIENT_BY_ID($id_: ID) {
  user {
    patient {
      one(id_: $id_) {
        id_
        firstName
        lastName
        byPhone {
          phone
        }
        byEmail {
          email
        }
        language
        sex
        birthDate
        fullAddress {
          city
          country
          address
          zipcode
        }
        lifestyle {
          uuid
          healthRating
          sleepHealth
          fitness
          smoking
          drinking
          nutrition
          drug
          diet
        }
        vaccines {
          uuid
          name
          date
        }
        medicalHistory {
          id_
          name
          date
          comment
        }
        medicalCondition {
          uuid
          name
          startDate
          endDate
        }
        allergies {
          uuid
          category
          substance
          reactionTask
          severity
          certainty
          comment
        }
        family {
          mother
          father
          grandparents
        }
      }
    }
  }
}
    `;

/**
 * __useGet_Patient_By_IdQuery__
 *
 * To run a query within a React component, call `useGet_Patient_By_IdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Patient_By_IdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Patient_By_IdQuery({
 *   variables: {
 *      id_: // value for 'id_'
 *   },
 * });
 */
export function useGet_Patient_By_IdQuery(baseOptions?: Apollo.QueryHookOptions<Get_Patient_By_IdQuery, Get_Patient_By_IdQueryVariables>) {
        return Apollo.useQuery<Get_Patient_By_IdQuery, Get_Patient_By_IdQueryVariables>(Get_Patient_By_IdDocument, baseOptions);
      }
export function useGet_Patient_By_IdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Patient_By_IdQuery, Get_Patient_By_IdQueryVariables>) {
          return Apollo.useLazyQuery<Get_Patient_By_IdQuery, Get_Patient_By_IdQueryVariables>(Get_Patient_By_IdDocument, baseOptions);
        }
export type Get_Patient_By_IdQueryHookResult = ReturnType<typeof useGet_Patient_By_IdQuery>;
export type Get_Patient_By_IdLazyQueryHookResult = ReturnType<typeof useGet_Patient_By_IdLazyQuery>;
export type Get_Patient_By_IdQueryResult = Apollo.QueryResult<Get_Patient_By_IdQuery, Get_Patient_By_IdQueryVariables>;
export const Set_Basic_InfoDocument = gql`
    mutation SET_BASIC_INFO( $record: PatientUpdateInput! ) {
  user {
    patientUser {
      update(
        record: $record
      ) {
        resultId
        result {
          id_,
          firstName,
          lastName,
          birthDate,
          sex,
          language
        }
        ok
        error {
          message
        }
      }
    }
  }
}
    `;
export type Set_Basic_InfoMutationFn = Apollo.MutationFunction<Set_Basic_InfoMutation, Set_Basic_InfoMutationVariables>;

/**
 * __useSet_Basic_InfoMutation__
 *
 * To run a mutation, you first call `useSet_Basic_InfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSet_Basic_InfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setBasicInfoMutation, { data, loading, error }] = useSet_Basic_InfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      birthDate: // value for 'birthDate'
 *      sex: // value for 'sex'
 *      address: // value for 'address'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useSet_Basic_InfoMutation(baseOptions?: Apollo.MutationHookOptions<Set_Basic_InfoMutation, Set_Basic_InfoMutationVariables>) {
        return Apollo.useMutation<Set_Basic_InfoMutation, Set_Basic_InfoMutationVariables>(Set_Basic_InfoDocument, baseOptions);
      }
export type Set_Basic_InfoMutationHookResult = ReturnType<typeof useSet_Basic_InfoMutation>;
export type Set_Basic_InfoMutationResult = Apollo.MutationResult<Set_Basic_InfoMutation>;
export type Set_Basic_InfoMutationOptions = Apollo.BaseMutationOptions<Set_Basic_InfoMutation, Set_Basic_InfoMutationVariables>;
export const Update_AllergyDocument = gql`
    mutation UPDATE_ALLERGY($patient: ID!, $record: AllergyUpdateInput!) {
  user {
    patientUser {
      allergy {
        update(patient: $patient, record: $record) {
          ok
          error {
            message
          }
          result {
            uuid
            name
            date
          }
        }
      }
    }
  }
}
    `;
export type Update_AllergyMutationFn = Apollo.MutationFunction<Update_AllergyMutation, Update_AllergyMutationVariables>;

/**
 * __useUpdate_AllergyMutation__
 *
 * To run a mutation, you first call `useUpdate_AllergyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_AllergyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAllergyMutation, { data, loading, error }] = useUpdate_AllergyMutation({
 *   variables: {
 *      patient: // value for 'patient'
 *      record: // value for 'record'
 *   },
 * });
 */
export function useUpdate_AllergyMutation(baseOptions?: Apollo.MutationHookOptions<Update_AllergyMutation, Update_AllergyMutationVariables>) {
        return Apollo.useMutation<Update_AllergyMutation, Update_AllergyMutationVariables>(Update_AllergyDocument, baseOptions);
      }
export type Update_AllergyMutationHookResult = ReturnType<typeof useUpdate_AllergyMutation>;
export type Update_AllergyMutationResult = Apollo.MutationResult<Update_AllergyMutation>;
export type Update_AllergyMutationOptions = Apollo.BaseMutationOptions<Update_AllergyMutation, Update_AllergyMutationVariables>;
export const Update_FamilyDocument = gql`
    mutation UPDATE_FAMILY($patient: ID!, $record: FamilyInput!) {
  user {
    patientUser {
      updateFamily(patient: $patient, record: $record) {
        ok
        result {
          family {
            mother
            father
            grandparents
          }
        }
        error {
          message
        }
      }
    }
  }
}
    `;
export type Update_FamilyMutationFn = Apollo.MutationFunction<Update_FamilyMutation, Update_FamilyMutationVariables>;

/**
 * __useUpdate_FamilyMutation__
 *
 * To run a mutation, you first call `useUpdate_FamilyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_FamilyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFamilyMutation, { data, loading, error }] = useUpdate_FamilyMutation({
 *   variables: {
 *      patient: // value for 'patient'
 *      record: // value for 'record'
 *   },
 * });
 */
export function useUpdate_FamilyMutation(baseOptions?: Apollo.MutationHookOptions<Update_FamilyMutation, Update_FamilyMutationVariables>) {
        return Apollo.useMutation<Update_FamilyMutation, Update_FamilyMutationVariables>(Update_FamilyDocument, baseOptions);
      }
export type Update_FamilyMutationHookResult = ReturnType<typeof useUpdate_FamilyMutation>;
export type Update_FamilyMutationResult = Apollo.MutationResult<Update_FamilyMutation>;
export type Update_FamilyMutationOptions = Apollo.BaseMutationOptions<Update_FamilyMutation, Update_FamilyMutationVariables>;
export const Update_VaccineDocument = gql`
    mutation UPDATE_VACCINE($patient: ID!, $record: VaccineUpdateInput!) {
  user {
    patientUser {
      vaccine {
        update(patient: $patient, record: $record) {
          ok
          error {
            message
          }
          result {
            uuid
            name
            date
          }
        }
      }
    }
  }
}
    `;
export type Update_VaccineMutationFn = Apollo.MutationFunction<Update_VaccineMutation, Update_VaccineMutationVariables>;

/**
 * __useUpdate_VaccineMutation__
 *
 * To run a mutation, you first call `useUpdate_VaccineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_VaccineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVaccineMutation, { data, loading, error }] = useUpdate_VaccineMutation({
 *   variables: {
 *      patient: // value for 'patient'
 *      record: // value for 'record'
 *   },
 * });
 */
export function useUpdate_VaccineMutation(baseOptions?: Apollo.MutationHookOptions<Update_VaccineMutation, Update_VaccineMutationVariables>) {
        return Apollo.useMutation<Update_VaccineMutation, Update_VaccineMutationVariables>(Update_VaccineDocument, baseOptions);
      }
export type Update_VaccineMutationHookResult = ReturnType<typeof useUpdate_VaccineMutation>;
export type Update_VaccineMutationResult = Apollo.MutationResult<Update_VaccineMutation>;
export type Update_VaccineMutationOptions = Apollo.BaseMutationOptions<Update_VaccineMutation, Update_VaccineMutationVariables>;
export const Delete_AppointmentDocument = gql`
    mutation DELETE_APPOINTMENT($id_: ID!) {
  schedule {
    cancelAppointment(id_: $id_) {
      ok
      error {
        message
      }
      resultId
    }
  }
}
    `;
export type Delete_AppointmentMutationFn = Apollo.MutationFunction<Delete_AppointmentMutation, Delete_AppointmentMutationVariables>;

/**
 * __useDelete_AppointmentMutation__
 *
 * To run a mutation, you first call `useDelete_AppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_AppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAppointmentMutation, { data, loading, error }] = useDelete_AppointmentMutation({
 *   variables: {
 *      id_: // value for 'id_'
 *   },
 * });
 */
export function useDelete_AppointmentMutation(baseOptions?: Apollo.MutationHookOptions<Delete_AppointmentMutation, Delete_AppointmentMutationVariables>) {
        return Apollo.useMutation<Delete_AppointmentMutation, Delete_AppointmentMutationVariables>(Delete_AppointmentDocument, baseOptions);
      }
export type Delete_AppointmentMutationHookResult = ReturnType<typeof useDelete_AppointmentMutation>;
export type Delete_AppointmentMutationResult = Apollo.MutationResult<Delete_AppointmentMutation>;
export type Delete_AppointmentMutationOptions = Apollo.BaseMutationOptions<Delete_AppointmentMutation, Delete_AppointmentMutationVariables>;
export const Delete_EventDocument = gql`
    mutation DELETE_EVENT($id: ID!) {
  schedule {
    cancelEvent(id_: $id) {
      ok
      error {
        code
      }
      resultId
      result {
        users {
          status
        }
      }
    }
  }
}
    `;
export type Delete_EventMutationFn = Apollo.MutationFunction<Delete_EventMutation, Delete_EventMutationVariables>;

/**
 * __useDelete_EventMutation__
 *
 * To run a mutation, you first call `useDelete_EventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_EventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDelete_EventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDelete_EventMutation(baseOptions?: Apollo.MutationHookOptions<Delete_EventMutation, Delete_EventMutationVariables>) {
        return Apollo.useMutation<Delete_EventMutation, Delete_EventMutationVariables>(Delete_EventDocument, baseOptions);
      }
export type Delete_EventMutationHookResult = ReturnType<typeof useDelete_EventMutation>;
export type Delete_EventMutationResult = Apollo.MutationResult<Delete_EventMutation>;
export type Delete_EventMutationOptions = Apollo.BaseMutationOptions<Delete_EventMutation, Delete_EventMutationVariables>;
export const Get_EventsDocument = gql`
    query GET_EVENTS($filter: FilterFindManyAppointment!) {
  schedule {
    eventMany(filter: $filter) {
      items {
        ... on Appointment {
          id_
          title
          eventType
          location {
            id_
          }
          startDate
          endDate
          createdAt
          createdBy {
            status
            id_
            firstName
            lastName
            sex
            birthDate
          }
          isAppointment
          note
          isOnline
          patient {
            status
            id_
            firstName
            lastName
            sex
            birthDate
          }
          user {
            status
            id_
            firstName
            lastName
            sex
            birthDate
          }
        }
        ... on Event {
          id_
          title
          eventType
          location {
            id_
          }
          startDate
          endDate
          createdAt
          createdBy {
            status
            id_
            firstName
            lastName
            sex
            birthDate
          }
          patients {
            status
            id_
            firstName
            lastName
            sex
            birthDate
          }
          users {
            status
            id_
            firstName
            lastName
            sex
            birthDate
          }
          isAppointment
        }
      }
    }
  }
}
    `;

/**
 * __useGet_EventsQuery__
 *
 * To run a query within a React component, call `useGet_EventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_EventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_EventsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGet_EventsQuery(baseOptions: Apollo.QueryHookOptions<Get_EventsQuery, Get_EventsQueryVariables>) {
        return Apollo.useQuery<Get_EventsQuery, Get_EventsQueryVariables>(Get_EventsDocument, baseOptions);
      }
export function useGet_EventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_EventsQuery, Get_EventsQueryVariables>) {
          return Apollo.useLazyQuery<Get_EventsQuery, Get_EventsQueryVariables>(Get_EventsDocument, baseOptions);
        }
export type Get_EventsQueryHookResult = ReturnType<typeof useGet_EventsQuery>;
export type Get_EventsLazyQueryHookResult = ReturnType<typeof useGet_EventsLazyQuery>;
export type Get_EventsQueryResult = Apollo.QueryResult<Get_EventsQuery, Get_EventsQueryVariables>;
export const Get_Org_Unit_MembersDocument = gql`
    query GET_ORG_UNIT_MEMBERS($page: Int!, $perPage: Int!, $filter: FilterFindManyUserInput!) {
  user {
    dashboard {
      pagedList(page: $page, perPage: $perPage, filter: $filter) {
        items {
          id_
          firstName
          lastName
          orgUnit {
            ... on CareTeam {
              id_
              name
            }
            ... on SubOrganization {
              id_
              name
            }
          }
        }
        pageInfo {
          page
          perPage
          hasNextPage
        }
      }
    }
  }
}
    `;

/**
 * __useGet_Org_Unit_MembersQuery__
 *
 * To run a query within a React component, call `useGet_Org_Unit_MembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Org_Unit_MembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Org_Unit_MembersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGet_Org_Unit_MembersQuery(baseOptions: Apollo.QueryHookOptions<Get_Org_Unit_MembersQuery, Get_Org_Unit_MembersQueryVariables>) {
        return Apollo.useQuery<Get_Org_Unit_MembersQuery, Get_Org_Unit_MembersQueryVariables>(Get_Org_Unit_MembersDocument, baseOptions);
      }
export function useGet_Org_Unit_MembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Org_Unit_MembersQuery, Get_Org_Unit_MembersQueryVariables>) {
          return Apollo.useLazyQuery<Get_Org_Unit_MembersQuery, Get_Org_Unit_MembersQueryVariables>(Get_Org_Unit_MembersDocument, baseOptions);
        }
export type Get_Org_Unit_MembersQueryHookResult = ReturnType<typeof useGet_Org_Unit_MembersQuery>;
export type Get_Org_Unit_MembersLazyQueryHookResult = ReturnType<typeof useGet_Org_Unit_MembersLazyQuery>;
export type Get_Org_Unit_MembersQueryResult = Apollo.QueryResult<Get_Org_Unit_MembersQuery, Get_Org_Unit_MembersQueryVariables>;
export const Reschedule_AppointmentDocument = gql`
    mutation RESCHEDULE_APPOINTMENT($id_: GrapheneMongoId!, $startDate: DateTime!, $endDate: DateTime!) {
  schedule {
    rescheduleAppointment(
      record: {id_: $id_, startDate: $startDate, endDate: $endDate}
    ) {
      ok
      error {
        message
      }
      result {
        id_
        startDate
        endDate
      }
    }
  }
}
    `;
export type Reschedule_AppointmentMutationFn = Apollo.MutationFunction<Reschedule_AppointmentMutation, Reschedule_AppointmentMutationVariables>;

/**
 * __useReschedule_AppointmentMutation__
 *
 * To run a mutation, you first call `useReschedule_AppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReschedule_AppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rescheduleAppointmentMutation, { data, loading, error }] = useReschedule_AppointmentMutation({
 *   variables: {
 *      id_: // value for 'id_'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useReschedule_AppointmentMutation(baseOptions?: Apollo.MutationHookOptions<Reschedule_AppointmentMutation, Reschedule_AppointmentMutationVariables>) {
        return Apollo.useMutation<Reschedule_AppointmentMutation, Reschedule_AppointmentMutationVariables>(Reschedule_AppointmentDocument, baseOptions);
      }
export type Reschedule_AppointmentMutationHookResult = ReturnType<typeof useReschedule_AppointmentMutation>;
export type Reschedule_AppointmentMutationResult = Apollo.MutationResult<Reschedule_AppointmentMutation>;
export type Reschedule_AppointmentMutationOptions = Apollo.BaseMutationOptions<Reschedule_AppointmentMutation, Reschedule_AppointmentMutationVariables>;
export const Reschedule_EventDocument = gql`
    mutation RESCHEDULE_EVENT($id_: GrapheneMongoId!, $startDate: DateTime!, $endDate: DateTime!) {
  schedule {
    rescheduleEvent(record: {id_: $id_, startDate: $startDate, endDate: $endDate}) {
      ok
      error {
        message
      }
      result {
        id_
        startDate
        endDate
      }
    }
  }
}
    `;
export type Reschedule_EventMutationFn = Apollo.MutationFunction<Reschedule_EventMutation, Reschedule_EventMutationVariables>;

/**
 * __useReschedule_EventMutation__
 *
 * To run a mutation, you first call `useReschedule_EventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReschedule_EventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rescheduleEventMutation, { data, loading, error }] = useReschedule_EventMutation({
 *   variables: {
 *      id_: // value for 'id_'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useReschedule_EventMutation(baseOptions?: Apollo.MutationHookOptions<Reschedule_EventMutation, Reschedule_EventMutationVariables>) {
        return Apollo.useMutation<Reschedule_EventMutation, Reschedule_EventMutationVariables>(Reschedule_EventDocument, baseOptions);
      }
export type Reschedule_EventMutationHookResult = ReturnType<typeof useReschedule_EventMutation>;
export type Reschedule_EventMutationResult = Apollo.MutationResult<Reschedule_EventMutation>;
export type Reschedule_EventMutationOptions = Apollo.BaseMutationOptions<Reschedule_EventMutation, Reschedule_EventMutationVariables>;
export const Update_AppointmentDocument = gql`
    mutation UPDATE_APPOINTMENT($recordAppointment: UpdateAppointmentInput!, $recordReschedule: RescheduleAppointmentInput!) {
  schedule {
    updateAppointment(record: $recordAppointment) {
      ok
      error {
        message
      }
      result {
        id_
        title
        isOnline
        eventType
        createdAt
        createdBy {
          id_
          firstName
          lastName
          status
          sex
          birthDate
        }
        isAppointment
        location {
          id_
        }
        patient {
          status
          id_
          firstName
          lastName
          sex
          birthDate
        }
        createdBy {
          status
          id_
          firstName
          lastName
          sex
          birthDate
        }
        note
        endDate
        startDate
        user {
          status
          id_
          firstName
          lastName
          sex
          birthDate
        }
        patient {
          id_
          firstName
          lastName
        }
      }
    }
    rescheduleAppointment(record: $recordReschedule) {
      ok
      error {
        message
      }
      result {
        id_
        startDate
        endDate
      }
    }
  }
}
    `;
export type Update_AppointmentMutationFn = Apollo.MutationFunction<Update_AppointmentMutation, Update_AppointmentMutationVariables>;

/**
 * __useUpdate_AppointmentMutation__
 *
 * To run a mutation, you first call `useUpdate_AppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_AppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppointmentMutation, { data, loading, error }] = useUpdate_AppointmentMutation({
 *   variables: {
 *      recordAppointment: // value for 'recordAppointment'
 *      recordReschedule: // value for 'recordReschedule'
 *   },
 * });
 */
export function useUpdate_AppointmentMutation(baseOptions?: Apollo.MutationHookOptions<Update_AppointmentMutation, Update_AppointmentMutationVariables>) {
        return Apollo.useMutation<Update_AppointmentMutation, Update_AppointmentMutationVariables>(Update_AppointmentDocument, baseOptions);
      }
export type Update_AppointmentMutationHookResult = ReturnType<typeof useUpdate_AppointmentMutation>;
export type Update_AppointmentMutationResult = Apollo.MutationResult<Update_AppointmentMutation>;
export type Update_AppointmentMutationOptions = Apollo.BaseMutationOptions<Update_AppointmentMutation, Update_AppointmentMutationVariables>;
export const Update_EventDocument = gql`
    mutation UPDATE_EVENT($recordEvent: UpdateEventInput!, $recordReschedule: RescheduleEventInput!) {
  schedule {
    updateEvent(record: $recordEvent) {
      ok
      error {
        message
      }
      result {
        id_
        title
        eventType
        createdAt
        createdBy {
          id_
          firstName
          lastName
          status
          sex
          birthDate
        }
        isAppointment
        location {
          id_
        }
        patients {
          id_
          firstName
          lastName
        }
        endDate
        startDate
        createdBy {
          status
          id_
          firstName
          lastName
          sex
          birthDate
        }
        users {
          id_
          firstName
          lastName
          sex
          status
          birthDate
        }
      }
    }
    rescheduleEvent(record: $recordReschedule) {
      ok
      error {
        message
      }
      result {
        id_
        startDate
        endDate
      }
    }
  }
}
    `;
export type Update_EventMutationFn = Apollo.MutationFunction<Update_EventMutation, Update_EventMutationVariables>;

/**
 * __useUpdate_EventMutation__
 *
 * To run a mutation, you first call `useUpdate_EventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_EventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdate_EventMutation({
 *   variables: {
 *      recordEvent: // value for 'recordEvent'
 *      recordReschedule: // value for 'recordReschedule'
 *   },
 * });
 */
export function useUpdate_EventMutation(baseOptions?: Apollo.MutationHookOptions<Update_EventMutation, Update_EventMutationVariables>) {
        return Apollo.useMutation<Update_EventMutation, Update_EventMutationVariables>(Update_EventDocument, baseOptions);
      }
export type Update_EventMutationHookResult = ReturnType<typeof useUpdate_EventMutation>;
export type Update_EventMutationResult = Apollo.MutationResult<Update_EventMutation>;
export type Update_EventMutationOptions = Apollo.BaseMutationOptions<Update_EventMutation, Update_EventMutationVariables>;
export const Add_UsersDocument = gql`
    mutation ADD_USERS($record: AddUserToOrgUnitInput!) {
  orgUnit {
    addUsers(record: $record) {
      ok
      error {
        message
      }
      result {
        ... on CareTeam {
          users {
            id_
            lastName
            firstName
            byEmail {
              email
            }
            byPhone {
              phone
            }
            role
            orgUnit {
              ... on CareTeam {
                id_
                name
                __typename
                subOrg {
                  id_
                  name
                }
              }
              ... on SubOrganization {
                id_
                name
                __typename
              }
            }
          }
        }
        ... on SubOrganization {
          users {
            id_
            lastName
            firstName
            byEmail {
              email
            }
            byPhone {
              phone
            }
            role
            orgUnit {
              ... on CareTeam {
                id_
                name
                __typename
                subOrg {
                  id_
                  name
                }
              }
              ... on SubOrganization {
                id_
                name
                __typename
              }
            }
          }
        }
      }
    }
  }
}
    `;
export type Add_UsersMutationFn = Apollo.MutationFunction<Add_UsersMutation, Add_UsersMutationVariables>;

/**
 * __useAdd_UsersMutation__
 *
 * To run a mutation, you first call `useAdd_UsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdd_UsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsersMutation, { data, loading, error }] = useAdd_UsersMutation({
 *   variables: {
 *      record: // value for 'record'
 *   },
 * });
 */
export function useAdd_UsersMutation(baseOptions?: Apollo.MutationHookOptions<Add_UsersMutation, Add_UsersMutationVariables>) {
        return Apollo.useMutation<Add_UsersMutation, Add_UsersMutationVariables>(Add_UsersDocument, baseOptions);
      }
export type Add_UsersMutationHookResult = ReturnType<typeof useAdd_UsersMutation>;
export type Add_UsersMutationResult = Apollo.MutationResult<Add_UsersMutation>;
export type Add_UsersMutationOptions = Apollo.BaseMutationOptions<Add_UsersMutation, Add_UsersMutationVariables>;
export const Create_Sub_OrgDocument = gql`
    mutation CREATE_SUB_ORG($record: SubOrgCreateInput!) {
  orgUnit {
    createSubOrg(record: $record) {
      result {
        name
      }
      ok
      resultId
      error {
        message
      }
    }
  }
}
    `;
export type Create_Sub_OrgMutationFn = Apollo.MutationFunction<Create_Sub_OrgMutation, Create_Sub_OrgMutationVariables>;

/**
 * __useCreate_Sub_OrgMutation__
 *
 * To run a mutation, you first call `useCreate_Sub_OrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_Sub_OrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubOrgMutation, { data, loading, error }] = useCreate_Sub_OrgMutation({
 *   variables: {
 *      record: // value for 'record'
 *   },
 * });
 */
export function useCreate_Sub_OrgMutation(baseOptions?: Apollo.MutationHookOptions<Create_Sub_OrgMutation, Create_Sub_OrgMutationVariables>) {
        return Apollo.useMutation<Create_Sub_OrgMutation, Create_Sub_OrgMutationVariables>(Create_Sub_OrgDocument, baseOptions);
      }
export type Create_Sub_OrgMutationHookResult = ReturnType<typeof useCreate_Sub_OrgMutation>;
export type Create_Sub_OrgMutationResult = Apollo.MutationResult<Create_Sub_OrgMutation>;
export type Create_Sub_OrgMutationOptions = Apollo.BaseMutationOptions<Create_Sub_OrgMutation, Create_Sub_OrgMutationVariables>;
export const Delete_Care_TeamDocument = gql`
    mutation DELETE_CARE_TEAM($id_: ID!) {
  orgUnit {
    deleteCareTeam(id_: $id_) {
      ok
      error {
        message
      }
    }
  }
}
    `;
export type Delete_Care_TeamMutationFn = Apollo.MutationFunction<Delete_Care_TeamMutation, Delete_Care_TeamMutationVariables>;

/**
 * __useDelete_Care_TeamMutation__
 *
 * To run a mutation, you first call `useDelete_Care_TeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_Care_TeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCareTeamMutation, { data, loading, error }] = useDelete_Care_TeamMutation({
 *   variables: {
 *      id_: // value for 'id_'
 *   },
 * });
 */
export function useDelete_Care_TeamMutation(baseOptions?: Apollo.MutationHookOptions<Delete_Care_TeamMutation, Delete_Care_TeamMutationVariables>) {
        return Apollo.useMutation<Delete_Care_TeamMutation, Delete_Care_TeamMutationVariables>(Delete_Care_TeamDocument, baseOptions);
      }
export type Delete_Care_TeamMutationHookResult = ReturnType<typeof useDelete_Care_TeamMutation>;
export type Delete_Care_TeamMutationResult = Apollo.MutationResult<Delete_Care_TeamMutation>;
export type Delete_Care_TeamMutationOptions = Apollo.BaseMutationOptions<Delete_Care_TeamMutation, Delete_Care_TeamMutationVariables>;
export const Delete_Dashboard_UserDocument = gql`
    mutation DELETE_DASHBOARD_USER($id_: ID!) {
  user {
    dashboardUser {
      delete(id_: $id_) {
        ok
        error {
          message
        }
      }
    }
  }
}
    `;
export type Delete_Dashboard_UserMutationFn = Apollo.MutationFunction<Delete_Dashboard_UserMutation, Delete_Dashboard_UserMutationVariables>;

/**
 * __useDelete_Dashboard_UserMutation__
 *
 * To run a mutation, you first call `useDelete_Dashboard_UserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_Dashboard_UserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDashboardUserMutation, { data, loading, error }] = useDelete_Dashboard_UserMutation({
 *   variables: {
 *      id_: // value for 'id_'
 *   },
 * });
 */
export function useDelete_Dashboard_UserMutation(baseOptions?: Apollo.MutationHookOptions<Delete_Dashboard_UserMutation, Delete_Dashboard_UserMutationVariables>) {
        return Apollo.useMutation<Delete_Dashboard_UserMutation, Delete_Dashboard_UserMutationVariables>(Delete_Dashboard_UserDocument, baseOptions);
      }
export type Delete_Dashboard_UserMutationHookResult = ReturnType<typeof useDelete_Dashboard_UserMutation>;
export type Delete_Dashboard_UserMutationResult = Apollo.MutationResult<Delete_Dashboard_UserMutation>;
export type Delete_Dashboard_UserMutationOptions = Apollo.BaseMutationOptions<Delete_Dashboard_UserMutation, Delete_Dashboard_UserMutationVariables>;
export const Delete_Sub_OrgDocument = gql`
    mutation DELETE_SUB_ORG($id_: ID!) {
  orgUnit {
    deleteSubOrg(id_: $id_) {
      ok
      error {
        message
      }
    }
  }
}
    `;
export type Delete_Sub_OrgMutationFn = Apollo.MutationFunction<Delete_Sub_OrgMutation, Delete_Sub_OrgMutationVariables>;

/**
 * __useDelete_Sub_OrgMutation__
 *
 * To run a mutation, you first call `useDelete_Sub_OrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_Sub_OrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubOrgMutation, { data, loading, error }] = useDelete_Sub_OrgMutation({
 *   variables: {
 *      id_: // value for 'id_'
 *   },
 * });
 */
export function useDelete_Sub_OrgMutation(baseOptions?: Apollo.MutationHookOptions<Delete_Sub_OrgMutation, Delete_Sub_OrgMutationVariables>) {
        return Apollo.useMutation<Delete_Sub_OrgMutation, Delete_Sub_OrgMutationVariables>(Delete_Sub_OrgDocument, baseOptions);
      }
export type Delete_Sub_OrgMutationHookResult = ReturnType<typeof useDelete_Sub_OrgMutation>;
export type Delete_Sub_OrgMutationResult = Apollo.MutationResult<Delete_Sub_OrgMutation>;
export type Delete_Sub_OrgMutationOptions = Apollo.BaseMutationOptions<Delete_Sub_OrgMutation, Delete_Sub_OrgMutationVariables>;
export const Delete_Users_In_Org_UnitDocument = gql`
    mutation DELETE_USERS_IN_ORG_UNIT($record: AddUserToOrgUnitInput!) {
  orgUnit {
    deleteUsers(record: $record) {
      ok
      error {
        message
      }
      result {
        ... on CareTeam {
          id_
          name
        }
        ... on SubOrganization {
          id_
          name
        }
      }
    }
  }
}
    `;
export type Delete_Users_In_Org_UnitMutationFn = Apollo.MutationFunction<Delete_Users_In_Org_UnitMutation, Delete_Users_In_Org_UnitMutationVariables>;

/**
 * __useDelete_Users_In_Org_UnitMutation__
 *
 * To run a mutation, you first call `useDelete_Users_In_Org_UnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_Users_In_Org_UnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUsersInOrgUnitMutation, { data, loading, error }] = useDelete_Users_In_Org_UnitMutation({
 *   variables: {
 *      record: // value for 'record'
 *   },
 * });
 */
export function useDelete_Users_In_Org_UnitMutation(baseOptions?: Apollo.MutationHookOptions<Delete_Users_In_Org_UnitMutation, Delete_Users_In_Org_UnitMutationVariables>) {
        return Apollo.useMutation<Delete_Users_In_Org_UnitMutation, Delete_Users_In_Org_UnitMutationVariables>(Delete_Users_In_Org_UnitDocument, baseOptions);
      }
export type Delete_Users_In_Org_UnitMutationHookResult = ReturnType<typeof useDelete_Users_In_Org_UnitMutation>;
export type Delete_Users_In_Org_UnitMutationResult = Apollo.MutationResult<Delete_Users_In_Org_UnitMutation>;
export type Delete_Users_In_Org_UnitMutationOptions = Apollo.BaseMutationOptions<Delete_Users_In_Org_UnitMutation, Delete_Users_In_Org_UnitMutationVariables>;
export const Get_Care_TeamsDocument = gql`
    query GET_CARE_TEAMS($page: Int!, $perPage: Int!, $filter: FilterFindManyCareTeam) {
  orgUnit {
    careTeamPagination(page: $page, perPage: $perPage, filter: $filter) {
      items {
        id_
        subOrg {
          id_
          name
        }
        name
        supervisors {
          id_
          firstName
          sex
          lastName
          birthDate
        }
        users {
          id_
        }
      }
      pageInfo {
        totalPages
        totalItems
        page
        perPage
        hasNextPage
      }
    }
  }
}
    `;

/**
 * __useGet_Care_TeamsQuery__
 *
 * To run a query within a React component, call `useGet_Care_TeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Care_TeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Care_TeamsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGet_Care_TeamsQuery(baseOptions: Apollo.QueryHookOptions<Get_Care_TeamsQuery, Get_Care_TeamsQueryVariables>) {
        return Apollo.useQuery<Get_Care_TeamsQuery, Get_Care_TeamsQueryVariables>(Get_Care_TeamsDocument, baseOptions);
      }
export function useGet_Care_TeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Care_TeamsQuery, Get_Care_TeamsQueryVariables>) {
          return Apollo.useLazyQuery<Get_Care_TeamsQuery, Get_Care_TeamsQueryVariables>(Get_Care_TeamsDocument, baseOptions);
        }
export type Get_Care_TeamsQueryHookResult = ReturnType<typeof useGet_Care_TeamsQuery>;
export type Get_Care_TeamsLazyQueryHookResult = ReturnType<typeof useGet_Care_TeamsLazyQuery>;
export type Get_Care_TeamsQueryResult = Apollo.QueryResult<Get_Care_TeamsQuery, Get_Care_TeamsQueryVariables>;
export const Get_Care_Teams_For_AutocompleteDocument = gql`
    query GET_CARE_TEAMS_FOR_AUTOCOMPLETE($page: Int!, $perPage: Int!, $filter: FilterFindManyCareTeam) {
  orgUnit {
    careTeamPagination(page: $page, perPage: $perPage, filter: $filter) {
      items {
        id_
        name
        subOrg {
          id_
        }
      }
      pageInfo {
        totalPages
        totalItems
        page
        perPage
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
    `;

/**
 * __useGet_Care_Teams_For_AutocompleteQuery__
 *
 * To run a query within a React component, call `useGet_Care_Teams_For_AutocompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Care_Teams_For_AutocompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Care_Teams_For_AutocompleteQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGet_Care_Teams_For_AutocompleteQuery(baseOptions: Apollo.QueryHookOptions<Get_Care_Teams_For_AutocompleteQuery, Get_Care_Teams_For_AutocompleteQueryVariables>) {
        return Apollo.useQuery<Get_Care_Teams_For_AutocompleteQuery, Get_Care_Teams_For_AutocompleteQueryVariables>(Get_Care_Teams_For_AutocompleteDocument, baseOptions);
      }
export function useGet_Care_Teams_For_AutocompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Care_Teams_For_AutocompleteQuery, Get_Care_Teams_For_AutocompleteQueryVariables>) {
          return Apollo.useLazyQuery<Get_Care_Teams_For_AutocompleteQuery, Get_Care_Teams_For_AutocompleteQueryVariables>(Get_Care_Teams_For_AutocompleteDocument, baseOptions);
        }
export type Get_Care_Teams_For_AutocompleteQueryHookResult = ReturnType<typeof useGet_Care_Teams_For_AutocompleteQuery>;
export type Get_Care_Teams_For_AutocompleteLazyQueryHookResult = ReturnType<typeof useGet_Care_Teams_For_AutocompleteLazyQuery>;
export type Get_Care_Teams_For_AutocompleteQueryResult = Apollo.QueryResult<Get_Care_Teams_For_AutocompleteQuery, Get_Care_Teams_For_AutocompleteQueryVariables>;
export const Get_Master_Org_InfoDocument = gql`
    query GET_MASTER_ORG_INFO {
  orgUnit {
    masterOrgMe {
      name
      phone
      email
      site
      fullAddress {
        country
        city
        address
        zipcode
      }
      workingHours {
        dayOfWeek
        startTime
        endTime
        startLunchTime
        endLunchTime
      }
      isDefaultWorkingHours
      logo
      created
      language
      facebook
      linkedin
      instagram
      description
    }
  }
}
    `;

/**
 * __useGet_Master_Org_InfoQuery__
 *
 * To run a query within a React component, call `useGet_Master_Org_InfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Master_Org_InfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Master_Org_InfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGet_Master_Org_InfoQuery(baseOptions?: Apollo.QueryHookOptions<Get_Master_Org_InfoQuery, Get_Master_Org_InfoQueryVariables>) {
        return Apollo.useQuery<Get_Master_Org_InfoQuery, Get_Master_Org_InfoQueryVariables>(Get_Master_Org_InfoDocument, baseOptions);
      }
export function useGet_Master_Org_InfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Master_Org_InfoQuery, Get_Master_Org_InfoQueryVariables>) {
          return Apollo.useLazyQuery<Get_Master_Org_InfoQuery, Get_Master_Org_InfoQueryVariables>(Get_Master_Org_InfoDocument, baseOptions);
        }
export type Get_Master_Org_InfoQueryHookResult = ReturnType<typeof useGet_Master_Org_InfoQuery>;
export type Get_Master_Org_InfoLazyQueryHookResult = ReturnType<typeof useGet_Master_Org_InfoLazyQuery>;
export type Get_Master_Org_InfoQueryResult = Apollo.QueryResult<Get_Master_Org_InfoQuery, Get_Master_Org_InfoQueryVariables>;
export const Get_Sub_OrgsDocument = gql`
    query GET_SUB_ORGS($page: Int!, $perPage: Int!, $filter: FilterFindManyOrgUnit) {
  orgUnit {
    subOrgPagination(page: $page, perPage: $perPage, filter: $filter) {
      items {
        id_
        name
        email
        phone
        site
        supervisors {
          id_
          firstName
          sex
          lastName
          birthDate
        }
        users {
          id_
        }
        careTeams {
          id_
          name
        }
        fullAddress {
          address
          zipcode
          city
          country
        }
      }
      pageInfo {
        totalPages
        totalItems
        page
        perPage
        hasNextPage
      }
    }
  }
}
    `;

/**
 * __useGet_Sub_OrgsQuery__
 *
 * To run a query within a React component, call `useGet_Sub_OrgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Sub_OrgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Sub_OrgsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGet_Sub_OrgsQuery(baseOptions: Apollo.QueryHookOptions<Get_Sub_OrgsQuery, Get_Sub_OrgsQueryVariables>) {
        return Apollo.useQuery<Get_Sub_OrgsQuery, Get_Sub_OrgsQueryVariables>(Get_Sub_OrgsDocument, baseOptions);
      }
export function useGet_Sub_OrgsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Sub_OrgsQuery, Get_Sub_OrgsQueryVariables>) {
          return Apollo.useLazyQuery<Get_Sub_OrgsQuery, Get_Sub_OrgsQueryVariables>(Get_Sub_OrgsDocument, baseOptions);
        }
export type Get_Sub_OrgsQueryHookResult = ReturnType<typeof useGet_Sub_OrgsQuery>;
export type Get_Sub_OrgsLazyQueryHookResult = ReturnType<typeof useGet_Sub_OrgsLazyQuery>;
export type Get_Sub_OrgsQueryResult = Apollo.QueryResult<Get_Sub_OrgsQuery, Get_Sub_OrgsQueryVariables>;
export const Get_Sub_Orgs_For_AutocompleteDocument = gql`
    query GET_SUB_ORGS_FOR_AUTOCOMPLETE($page: Int!, $perPage: Int!, $filter: FilterFindManyOrgUnit) {
  orgUnit {
    subOrgPagination(page: $page, perPage: $perPage, filter: $filter) {
      items {
        id_
        name
        careTeams {
          id_
          name
        }
      }
      pageInfo {
        totalPages
        totalItems
        page
        perPage
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
    `;

/**
 * __useGet_Sub_Orgs_For_AutocompleteQuery__
 *
 * To run a query within a React component, call `useGet_Sub_Orgs_For_AutocompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Sub_Orgs_For_AutocompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Sub_Orgs_For_AutocompleteQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGet_Sub_Orgs_For_AutocompleteQuery(baseOptions: Apollo.QueryHookOptions<Get_Sub_Orgs_For_AutocompleteQuery, Get_Sub_Orgs_For_AutocompleteQueryVariables>) {
        return Apollo.useQuery<Get_Sub_Orgs_For_AutocompleteQuery, Get_Sub_Orgs_For_AutocompleteQueryVariables>(Get_Sub_Orgs_For_AutocompleteDocument, baseOptions);
      }
export function useGet_Sub_Orgs_For_AutocompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Sub_Orgs_For_AutocompleteQuery, Get_Sub_Orgs_For_AutocompleteQueryVariables>) {
          return Apollo.useLazyQuery<Get_Sub_Orgs_For_AutocompleteQuery, Get_Sub_Orgs_For_AutocompleteQueryVariables>(Get_Sub_Orgs_For_AutocompleteDocument, baseOptions);
        }
export type Get_Sub_Orgs_For_AutocompleteQueryHookResult = ReturnType<typeof useGet_Sub_Orgs_For_AutocompleteQuery>;
export type Get_Sub_Orgs_For_AutocompleteLazyQueryHookResult = ReturnType<typeof useGet_Sub_Orgs_For_AutocompleteLazyQuery>;
export type Get_Sub_Orgs_For_AutocompleteQueryResult = Apollo.QueryResult<Get_Sub_Orgs_For_AutocompleteQuery, Get_Sub_Orgs_For_AutocompleteQueryVariables>;
export const Get_Dashboard_UsersDocument = gql`
    query GET_DASHBOARD_USERS($page: Int!, $perPage: Int!, $filter: FilterFindManyUserInput) {
  user {
    dashboard {
      pagedList(page: $page, perPage: $perPage, filter: $filter) {
        items {
          id_
          firstName
          lastName
          role
          orgUnit {
            ... on CareTeam {
              id_
              name
              __typename
              subOrg {
                id_
                name
              }
            }
            ... on SubOrganization {
              id_
              name
              __typename
            }
          }
          byEmail {
            email
          }
        }
        pageInfo {
          perPage
          page
          totalItems
          totalPages
        }
      }
    }
  }
}
    `;

/**
 * __useGet_Dashboard_UsersQuery__
 *
 * To run a query within a React component, call `useGet_Dashboard_UsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Dashboard_UsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Dashboard_UsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGet_Dashboard_UsersQuery(baseOptions: Apollo.QueryHookOptions<Get_Dashboard_UsersQuery, Get_Dashboard_UsersQueryVariables>) {
        return Apollo.useQuery<Get_Dashboard_UsersQuery, Get_Dashboard_UsersQueryVariables>(Get_Dashboard_UsersDocument, baseOptions);
      }
export function useGet_Dashboard_UsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Dashboard_UsersQuery, Get_Dashboard_UsersQueryVariables>) {
          return Apollo.useLazyQuery<Get_Dashboard_UsersQuery, Get_Dashboard_UsersQueryVariables>(Get_Dashboard_UsersDocument, baseOptions);
        }
export type Get_Dashboard_UsersQueryHookResult = ReturnType<typeof useGet_Dashboard_UsersQuery>;
export type Get_Dashboard_UsersLazyQueryHookResult = ReturnType<typeof useGet_Dashboard_UsersLazyQuery>;
export type Get_Dashboard_UsersQueryResult = Apollo.QueryResult<Get_Dashboard_UsersQuery, Get_Dashboard_UsersQueryVariables>;
export const Get_Dashboard_Users_For_AutocompleteDocument = gql`
    query GET_DASHBOARD_USERS_FOR_AUTOCOMPLETE($page: Int!, $perPage: Int!, $filter: FilterFindManyUserInput) {
  user {
    dashboard {
      pagedList(page: $page, perPage: $perPage, filter: $filter) {
        items {
          id_
          firstName
          lastName
        }
        pageInfo {
          perPage
          page
          totalItems
          totalPages
          hasNextPage
        }
      }
    }
  }
}
    `;

/**
 * __useGet_Dashboard_Users_For_AutocompleteQuery__
 *
 * To run a query within a React component, call `useGet_Dashboard_Users_For_AutocompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Dashboard_Users_For_AutocompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Dashboard_Users_For_AutocompleteQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGet_Dashboard_Users_For_AutocompleteQuery(baseOptions: Apollo.QueryHookOptions<Get_Dashboard_Users_For_AutocompleteQuery, Get_Dashboard_Users_For_AutocompleteQueryVariables>) {
        return Apollo.useQuery<Get_Dashboard_Users_For_AutocompleteQuery, Get_Dashboard_Users_For_AutocompleteQueryVariables>(Get_Dashboard_Users_For_AutocompleteDocument, baseOptions);
      }
export function useGet_Dashboard_Users_For_AutocompleteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Dashboard_Users_For_AutocompleteQuery, Get_Dashboard_Users_For_AutocompleteQueryVariables>) {
          return Apollo.useLazyQuery<Get_Dashboard_Users_For_AutocompleteQuery, Get_Dashboard_Users_For_AutocompleteQueryVariables>(Get_Dashboard_Users_For_AutocompleteDocument, baseOptions);
        }
export type Get_Dashboard_Users_For_AutocompleteQueryHookResult = ReturnType<typeof useGet_Dashboard_Users_For_AutocompleteQuery>;
export type Get_Dashboard_Users_For_AutocompleteLazyQueryHookResult = ReturnType<typeof useGet_Dashboard_Users_For_AutocompleteLazyQuery>;
export type Get_Dashboard_Users_For_AutocompleteQueryResult = Apollo.QueryResult<Get_Dashboard_Users_For_AutocompleteQuery, Get_Dashboard_Users_For_AutocompleteQueryVariables>;
export const Update_Dashboard_UserDocument = gql`
    mutation UPDATE_DASHBOARD_USER($record: DashboardUserUpdateInput!, $user: ID!) {
  user {
    dashboardUser {
      update(record: $record, user: $user) {
        ok
        error {
          message
        }
        result {
          id_
          firstName
          lastName
          role
          orgUnit {
            ... on CareTeam {
              id_
              name
              __typename
              subOrg {
                id_
                name
              }
            }
            ... on SubOrganization {
              id_
              name
              __typename
            }
          }
        }
      }
    }
  }
}
    `;
export type Update_Dashboard_UserMutationFn = Apollo.MutationFunction<Update_Dashboard_UserMutation, Update_Dashboard_UserMutationVariables>;

/**
 * __useUpdate_Dashboard_UserMutation__
 *
 * To run a mutation, you first call `useUpdate_Dashboard_UserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_Dashboard_UserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDashboardUserMutation, { data, loading, error }] = useUpdate_Dashboard_UserMutation({
 *   variables: {
 *      record: // value for 'record'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdate_Dashboard_UserMutation(baseOptions?: Apollo.MutationHookOptions<Update_Dashboard_UserMutation, Update_Dashboard_UserMutationVariables>) {
        return Apollo.useMutation<Update_Dashboard_UserMutation, Update_Dashboard_UserMutationVariables>(Update_Dashboard_UserDocument, baseOptions);
      }
export type Update_Dashboard_UserMutationHookResult = ReturnType<typeof useUpdate_Dashboard_UserMutation>;
export type Update_Dashboard_UserMutationResult = Apollo.MutationResult<Update_Dashboard_UserMutation>;
export type Update_Dashboard_UserMutationOptions = Apollo.BaseMutationOptions<Update_Dashboard_UserMutation, Update_Dashboard_UserMutationVariables>;
export const Update_Master_OrgDocument = gql`
    mutation UPDATE_MASTER_ORG($record: MasterOrgUpdateInput!) {
  orgUnit {
    updateMasterOrg(record: $record) {
      ok
      error {
        message
      }
      result {
        name
      }
    }
  }
}
    `;
export type Update_Master_OrgMutationFn = Apollo.MutationFunction<Update_Master_OrgMutation, Update_Master_OrgMutationVariables>;

/**
 * __useUpdate_Master_OrgMutation__
 *
 * To run a mutation, you first call `useUpdate_Master_OrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_Master_OrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMasterOrgMutation, { data, loading, error }] = useUpdate_Master_OrgMutation({
 *   variables: {
 *      record: // value for 'record'
 *   },
 * });
 */
export function useUpdate_Master_OrgMutation(baseOptions?: Apollo.MutationHookOptions<Update_Master_OrgMutation, Update_Master_OrgMutationVariables>) {
        return Apollo.useMutation<Update_Master_OrgMutation, Update_Master_OrgMutationVariables>(Update_Master_OrgDocument, baseOptions);
      }
export type Update_Master_OrgMutationHookResult = ReturnType<typeof useUpdate_Master_OrgMutation>;
export type Update_Master_OrgMutationResult = Apollo.MutationResult<Update_Master_OrgMutation>;
export type Update_Master_OrgMutationOptions = Apollo.BaseMutationOptions<Update_Master_OrgMutation, Update_Master_OrgMutationVariables>;