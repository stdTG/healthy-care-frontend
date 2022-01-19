import React, { useEffect, useState, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';
import { isNil } from 'ramda';

import useDialog from 'lib/hooks/useDialog';
import { Search } from 'components/ui';
import { SwitchFilterButton, NewPatientButton } from './components';
import CreatePatientDialog from './CreatePatientDialog';
import CreateSuccessDialog from './CreateSuccessDialog';
import EmptyPage from './EmptyPage';
import Filter from './Filter';
import { useMutation } from '@apollo/client';
import { CREATE_PATIENT } from './gqlSchemes/createPatient';
import { GET_PATIENTS } from './gqlSchemes/getPatients';
import useDebounce from 'lib/hooks/useDebounce';
import LoadingPage from '../../components/LoadingPage';
import useRunCarePlan from '../../lib/hooks/useRunCarePlan';
import AddCarePlanDialog from '../../components/ui/AddCarePlanDialog/index';
import PatientsTable from './PatientsTable';
import {
  useAddAppointmentDialog,
  useFilterBlockSwitching,
  useSetDefaultFilter,
  usePageLoading,
} from './hooks';
import { PatientsPageContainer } from './styled/patientsPageLayout';
import AppointmentDialog from '../SchedulePage/AppointmentDialog';
import { useTranslation } from 'react-i18next';

import { completePatientsInfo } from '../../lib/fakeData/fakePatientData';

export const TableContext = React.createContext({});

function PatientsPage() {
  const [filtersOpened, handleFilterButtonClick] = useFilterBlockSwitching();

  const createPatientDialog = useDialog();
  const createSuccessDialog = useDialog();
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [patients, setPatients] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(paginationInfo?.perPage || 5);

  const { addCarePlanDialog, onRunCarePlan } = useRunCarePlan(
    patients,
    setPatients
  );

  const {
    appointmentDialog,
    onOpenAppointmentDialog,
  } = useAddAppointmentDialog();

  const [filters, setFilters] = useState(null); // The root of all filters
  useSetDefaultFilter(setFilters);

  const [createPatientUser] = useMutation(CREATE_PATIENT);
  const { t } = useTranslation();

  const [getPatients, { called, loading, error, data }] = useLazyQuery(
    GET_PATIENTS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        page: pageNumber,
        perPage: rowsPerPage,
        filter: {
          ...filters,
        },
      },
    }
  );

  const pageLoading = usePageLoading(loading);

  const getPatientsWithDelay = useDebounce(
    () =>
      getPatients({
        fetchPolicy: 'no-cache',
        variables: {
          filter: {
            ...filters,
            name: search,
          },
        },
      }),
    200
  );

  useEffect(() => {
    if (!filters) {
      return;
    }
    getPatients();
  }, [pageNumber, filters]);

  useEffect(() => {
    if (!filters) {
      return;
    }
    getPatientsWithDelay();
  }, [search]);

  useEffect(() => {
    if (data?.user?.patient?.pagedList) {
      var fakedPatients = completePatientsInfo(
        data?.user?.patient?.pagedList?.items
      );

      setPatients(fakedPatients);
      setPaginationInfo(data?.user?.patient?.pagedList?.pageInfo);
    }
  }, [data]);

  const onSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  async function openNewPatientDialog() {
    const result = await createPatientDialog.open();

    if (!result || !result.data) return;

    const data = await saveUserRequested(result.data);

    const successResult = await createSuccessDialog.open(data);
    if (!successResult || !successResult.createNew) return;

    openNewPatientDialog();
  }

  const saveUserRequested = async (values) => {
    const response = await createPatientUser({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        sex: values.sex,
        byPhone: values.phone
          ? { phone: values.phone || '', sendSms: values.sendSms }
          : null,
        byEmail: { email: values.email, sendEmail: values.sendEmail },
      },
    });

    if (response.data?.user?.patientUser?.create?.ok) {
      const id = response.data?.user?.patientUser?.create?.resultId;

      getPatients();

      return { ...values, id };
    }
  };

  const valueForTableContext = useMemo(
    () => ({
      patients,
      paginationInfo,
      setPageNumber,
      pageNumber,
      rowsPerPage,
      setRowsPerPage,
      loading,
      filtersOpened,
      filters,
      setFilters,
      onOpenAppointmentDialog,
      onAddCarePlan: (id) => onRunCarePlan(id),
    }),
    [
      patients,
      paginationInfo,
      setPageNumber,
      pageNumber,
      rowsPerPage,
      setRowsPerPage,
      filtersOpened,
      loading,
      filters,
      setFilters,
    ]
  );

  return (
    <div>
      {isNil(patients) ? (
        !called || loading ? (
          <LoadingPage />
        ) : (
          <EmptyPage openNewPatientDialog={openNewPatientDialog} />
        )
      ) : pageLoading ? (
        <LoadingPage />
      ) : (
        <PatientsPageContainer isOpen={filtersOpened}>
          <header>
            <div>
              <SwitchFilterButton
                isOpen={filtersOpened}
                toSwitch={handleFilterButtonClick}
              />
            </div>
            <Search
              placeholder={t('Search patients')}
              value={search}
              onChange={onSearch}
              // onKeyUp={onSearchEnter}
            />
            <NewPatientButton onClick={openNewPatientDialog} />
          </header>
          <div className="body">
            {filtersOpened && (
              <Filter
                filters={filters}
                setFilters={setFilters}
                // genderStatistic={genderStatistic}
                patients={patients}
              />
            )}
            <TableContext.Provider value={valueForTableContext}>
              <div>
                <PatientsTable />
              </div>
            </TableContext.Provider>
          </div>
        </PatientsPageContainer>
      )}

      <CreatePatientDialog
        isOpen={createPatientDialog.isOpen}
        close={createPatientDialog.close}
        initialData={createPatientDialog.initialData}
      />
      <AddCarePlanDialog
        isOpen={addCarePlanDialog.isOpen}
        close={addCarePlanDialog.close}
      />
      <AppointmentDialog
        isOpen={appointmentDialog.isOpen}
        close={appointmentDialog.close}
        initialData={appointmentDialog.initialData}
      />
      <CreateSuccessDialog
        isOpen={createSuccessDialog.isOpen}
        close={createSuccessDialog.close}
        initialData={createSuccessDialog.initialData}
      />
    </div>
  );
}

export default PatientsPage;
