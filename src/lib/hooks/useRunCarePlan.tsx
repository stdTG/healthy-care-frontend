import useDialog from './useDialog';
import { PatientUser, useRun_Care_PlanMutation } from '../../generated/graphql';

const useRunCarePlan = (
  patients?: PatientUser[],
  setPatients?: (patients: PatientUser[]) => void ,
) => {
  const addCarePlanDialog = useDialog()
  const [runCarePlan, { loading }] = useRun_Care_PlanMutation()

  const onRunCarePlan = async (patientId: string) => {
    const dialogResult = await addCarePlanDialog.open()

    if (!dialogResult.protocol) {
      return
    }

    const response = await runCarePlan({
      variables: {
        patientId,
        carePlanId: dialogResult.protocol
      }
    })

    // const updatedCarePlanId = response.data.carePlan.runCarePlan?.runId
    // const updatedCarePlans = patients.map((patient) => {
    //   if (patient.assignments.carePlan.id_ === updatedCarePlanId)
    // })
  }

  return {
    addCarePlanDialog,
    onRunCarePlan
  }
}

export default useRunCarePlan
