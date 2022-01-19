import { useContext } from 'react';
import { Paper } from '@material-ui/core';
import AppTableContainer from '../../../components/Table';
import { TableContext } from '../index';

import { PatientsTableHeader } from './PatientsTableHeader';
import { PatientsList } from './PatientsList';
import { Pagination } from './Pagination';

export default function PatientsTable() {
  const { loading } = useContext(TableContext);

  return (
    <AppTableContainer loading={loading} component={Paper}>
      <PatientsTableHeader />
      <PatientsList />
      <Pagination />
    </AppTableContainer>
  );
}
