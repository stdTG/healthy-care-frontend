import {useContext} from 'react'
import { PatientFilters } from "./PatientFilters";
import { PatientsQtty } from "./PatientsQtty";
import {TableContext} from '../../index'

export const PatientsTableHeader = () => {
    const { paginationInfo } = useContext(TableContext);
    return (
      <header style={{ display: 'flex', alignItems: 'center' }}>
         <PatientsQtty />
         {paginationInfo && <PatientFilters />}
      </header>
    )
  }