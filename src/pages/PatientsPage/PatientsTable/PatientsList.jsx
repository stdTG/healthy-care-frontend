import { map } from 'ramda';
import { useContext } from 'react';
import { PatientRow } from './PatientRow';
import { TableContext } from '../index';

const RISKS = {
  NORMAL: 1,
  LOW: 5,
  HIGH: 10,
}
export const PatientsList = () => {
  const { patients } = useContext(TableContext);
  const metrics = JSON.parse(localStorage.getItem('metrics'));
  
  const patientsWithRisk = patients && patients.map((patient) => {
    return {
      ...patient,
      risk: metrics?.[patient.id_] && Object.values(metrics[patient.id_]).map((metric) => {
        const risksAsNumbers = RISKS[metric.risk]
        return risksAsNumbers
      }) || []
    }
  })
  
  const sortedPatientsByRisk = patientsWithRisk.sort((a, b) => {
    return Math.max(...b.risk) - Math.max(...a.risk)
  })
  
  return(
    <div style={{ padding: '0 25px' }}>
      {
        sortedPatientsByRisk.map((patient) => {
          return <PatientRow key={patient.id_} patient={patient}/>
        })
      }
    </div>
  );
};
