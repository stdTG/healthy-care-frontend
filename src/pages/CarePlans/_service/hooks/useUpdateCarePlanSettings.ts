import { GqlCarePlanType, useUpdate_Care_Plan_SettingsMutation } from '../../../../generated/graphql';
import { CarePlan } from '../../models';
import { useDispatch } from 'react-redux';
import { actions } from '../../carePlanService';

const useUpdateCarePlanSettings = () => {
  const dispatch = useDispatch()

  /*This ain't gonna update Tags if tags array is empty. Requires backend bugfix */
  const [updateCarePlanSetting, { data, loading }] = useUpdate_Care_Plan_SettingsMutation()

  const onCarePlanSettingsUpdate = async (type: GqlCarePlanType, values: CarePlan) => {
    const response = await updateCarePlanSetting({
      variables: {
        type,
        data: {
          id_: values.id_,
          name: values.name,
          subtitle: values.subtitle,
          description: values.description,
          image: values.image,
          durationMonths: values.durationMonths,
          durationWeeks: values.durationWeeks,
          durationDays: values.durationDays,
          tags: values.tags
        }
      }
    })

    if (response?.data?.carePlan?.update?.ok) {
      console.log(response?.data?.carePlan?.update?.result, 'RES')
      dispatch(actions.updateCarePlan({
        ...response?.data?.carePlan?.update?.result as any
      }))

      return response?.data?.carePlan?.update
    }
    return
  }

  return {
    onCarePlanSettingsUpdate,
    loadingUpdateCarePlanSetting: loading,
  }
}

export default useUpdateCarePlanSettings
