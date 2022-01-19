import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { actions as patientRecordActions } from 'services/patientRecord';
import { careTeamMemberRouteTemplates } from 'routing/routeTemplates';
import BackButton from '../../components/Buttons/BackButton/index';
import CardMedicalCondition from './CardMedicalCondition';
import CardAppointments from './CardAppointments';
import BasicInformation from './BasicInformation';
import RecordActions from './RecordActions';
import CardCarePlan from './CardCarePlan';
import CardFamily from './CardFamily';
import CardFiles from './CardFiles';
import CardNotes from './CardNotes';
import CardMedicalHistory from './CardMedicalHistory';
import CardMedication from './CardMedication';
import CardLifestyle from './CardLifestyle';
import CardAllergies from './CardAllergies';
import CardVaccines from './components/CardVaccines/index';
import CardMetrics from './CardMetrics';
import { useGet_Patient_By_IdQuery } from '../../generated/graphql';
import useRunCarePlan from '../../lib/hooks/useRunCarePlan';
import AddCarePlanDialog from '../../components/ui/AddCarePlanDialog';

import {
  SSpinnerWrap,
  PatientRecordPageLayout,
  CardsGridLayout,
  CardsHeaderLayout
} from './styled/PatientRecordPageLayuot'

import { useAddAppointmentDialog } from '../PatientsPage/hooks';
import AppointmentDialog from '../SchedulePage/AppointmentDialog';
import SocialDeterminant from './SocialDeterminant';
import { useTranslation } from 'react-i18next';

import { completePatientInfo } from '../../lib/fakeData/fakePatientData';


function PatientRecordPage() {
  const { id }: { id: string } = useParams();

  const dispatch = useDispatch();
  const { addCarePlanDialog, onRunCarePlan } = useRunCarePlan()

  const { loading, data } = useGet_Patient_By_IdQuery({
    variables: { id_: id },
  })

  const { t } = useTranslation();

  const {
    appointmentDialog,
    onOpenAppointmentDialog,
  } = useAddAppointmentDialog();

  useEffect(() => {
    if (!data) return;

    var tempPatient = Object.assign({}, data?.user?.patient?.one);
    var patient = completePatientInfo(tempPatient);

    const patientCard = patient && {
      id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      sex: patient.sex,
      birthDate: patient.birthDate,
      language: patient.language,
      email: patient.byEmail?.email,
      phone: patient.byPhone?.phone,
      fullAddress: patient.fullAddress,
      avatarPicture: patient.avatarPicture
    };

    patient && dispatch(
      patientRecordActions.setPatientInformation({
        patientData: patientCard,
        medicalHistory: patient.medicalHistory,
        medicalCondition: patient.medicalCondition,
        allergies: patient.allergies,
        family: patient.family,
        lifestyle: patient.lifestyle,
        vaccines: patient.vaccines,
      })
    );
  }, [data]);

  if (loading) {
    return (
      <SSpinnerWrap>
        <CircularProgress size={50} />
      </SSpinnerWrap>
    );
  }

  return (
    <PatientRecordPageLayout>
      <BackButton
        title={t('Patients')}
        route={careTeamMemberRouteTemplates.patientsPage}
      />

      <CardsHeaderLayout>
        <BasicInformation />
        <RecordActions
          onAddCarePlan={onRunCarePlan}
          onOpenAppointmentDialog={onOpenAppointmentDialog}
          patientId={id}
        />
      </CardsHeaderLayout>

      <CardsGridLayout>
        <div>
          <CardCarePlan />
          <CardMetrics />
          <CardVaccines />
          <CardFamily />
        </div>
        <div>
          <CardAppointments />
          <CardMedicalCondition />
          <CardAllergies />
          <CardMedicalHistory />
          <CardFiles />
        </div>
        <div>
          <CardMedication />
          <CardLifestyle />
          <CardNotes />
          <SocialDeterminant />
        </div>
      </CardsGridLayout>

      <AddCarePlanDialog
        isOpen={addCarePlanDialog.isOpen}
        close={addCarePlanDialog.close}
      />

      <AppointmentDialog
        isOpen={appointmentDialog.isOpen}
        close={appointmentDialog.close}
        /* @ts-ignore */
        initialData={appointmentDialog.initialData}
      />
    </PatientRecordPageLayout>
  );
}

export default PatientRecordPage;
