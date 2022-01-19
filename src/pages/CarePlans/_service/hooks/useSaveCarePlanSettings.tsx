// @ts-ignore
import { GqlCarePlanType, useSave_Care_Plan_SettingsMutation } from '../../../../generated/graphql';
import { CarePlan } from '../../models';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../carePlanService';

const useSaveCarePlanSettings = () => {
  const dispatch = useDispatch()
  const [carePlanId, setCarePlanId] = useState<string>()

  const [ saveCarePlanSettings, { loading: loadingSaveCareSettings, error: errorCareCarePlanSettings } ] = useSave_Care_Plan_SettingsMutation()

  const onSaveCarePlanSettings = async (values: CarePlan) => {
    const response = await saveCarePlanSettings({
      variables: {
        data: {
          name: values.name,
          subtitle: values.subtitle,
          description: values.description,
          durationDays: values.durationDays,
          durationMonths: values.durationMonths,
          durationWeeks: values.durationWeeks,
        },
        type: GqlCarePlanType.Workspace
      }

    })

    if (response?.data?.carePlan?.create?.ok) {
      setCarePlanId(response.data.carePlan.create.resultId as string)
      return response?.data?.carePlan?.create
    }
    return
  }

  return {
    onSaveCarePlanSettings,
    loadingSaveCareSettings,
    errorCareCarePlanSettings,
    carePlanId
  }
}

export default useSaveCarePlanSettings
