import {
  CarePlanCell,
  PersonalDataCell,
  MetricsCell,
  ConditionsCell,
  ClipboardListButtonCell,
  MessageButtonCell,
} from '../../components'
import { RowLayout } from './patientRowLayout'
import { Avatar } from 'components/ui';
import PatientActions from './PatientActions';
import { useEffect } from 'react';

interface PatientI {
  id_: string
  firstName: string
  lastName: string
  sex: string
  birthDate: string
  assignments: object[]
  metrics: object[]
  lifeStyle: object[] 
  socialDeterminant: object[] 
  medication: object[] 
  medicalHistory: object[] 
  medicalCondition: object[] 
  avatarPicture: any
}

export function PatientRow({ patient, graphDialog, setMetricForGraph }: { patient: PatientI, graphDialog: any, setMetricForGraph: any }) {
  const {
    id_,
    firstName,
    lastName,
    sex,
    birthDate,
    assignments,
    metrics,
    medicalCondition,
    avatarPicture,
  } = patient

  //Todo delete ts-ignore
  //@ts-ignore
  // const metrics = JSON.parse(localStorage.getItem('metrics')) || {}
  // const currentMetrics = metrics[id_]

  // const currentMetrics = metrics[0]
  const currentMetrics = metrics


  return (
    <RowLayout>
      <Avatar src={avatarPicture}/>

      <PersonalDataCell id_={id_} firstName={firstName} lastName={lastName} sex={sex} birthDate={birthDate} />
      <CarePlanCell assignments={assignments} />
      {/* <ConditionsCell conditions={medicalCondition && Object.values(medicalCondition)} /> */}
      <MetricsCell metrics={currentMetrics && Object.values(currentMetrics)} />

      <div style={{ display: 'flex' }}>
        <ClipboardListButtonCell />
        <MessageButtonCell patientId={id_} />
        <PatientActions patientId={id_} />
      </div>

    </RowLayout>
  )
}
