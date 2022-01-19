/*
  - Finds the patient in 'patients' by his id
  - Sets patientId to the form
  - Returns patient's name as "Name Surname" or returns null
*/
import { useEffect, useState } from "react"
import { FormApi } from 'final-form';
import {convertToTitleCase} from '../../../../lib/utils'

interface IUsePreselectedPatientProps {
  patients: any
  patientId: string | null
  form: FormApi
}

type PatientName = string | null 

export const usePreselectedPatient = ({
  patients, patientId, form
}: IUsePreselectedPatientProps): PatientName => {

  const [patientName, setPatientName] = useState<PatientName>(null)

  useEffect(() => {
    if (patients && patientId) {
      try {
        const patient = patients.find((option: any) => option.id_ === patientId)
        const patientName = `${convertToTitleCase(patient?.firstName)} ${convertToTitleCase(patient?.lastName)}`
        setPatientName(patientName)
        form.change('patient', patientId)
      } catch (error) {
        console.error(error);
      }
    }

  }, [patients, patientId, form])

  return patientName
}