import { GqlCarePlanType, useLoad_Care_Plan_JsonMutation } from '../../../../generated/graphql';

const useLoadCarePlanScheme = () => {
  const [loadJson, { data, loading }] = useLoad_Care_Plan_JsonMutation()

  const onLoadCarePlanJson = async (id: string, uiJson: string) => {
    const response = await loadJson({
      variables: {
        id_: id,
        uiJson,
        type: GqlCarePlanType.Workspace
      }
    })

    if (response?.data?.carePlan?.loadJson?.ok) {
      //todo refactor
      return {
        ok: response?.data?.carePlan?.loadJson?.ok,
        ...response.data.carePlan.loadJson.result
      }
    }

    return
  }

  return {
    onLoadCarePlanJson,
    loadingCarePlanJson: loading
  }
}

export default useLoadCarePlanScheme
