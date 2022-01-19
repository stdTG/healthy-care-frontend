import {
  Get_One_Care_PlanDocument,
  GqlCarePlanType,
  useGet_One_Care_PlanLazyQuery
} from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { CarePlan } from '../../models';
import { useDispatch } from 'react-redux';
import { actions } from '../../carePlanService';
import { actions as widgetActions } from 'services/widget';
import { FetchPolicy } from '@apollo/client/core/watchQueryOptions';

const useGetOneCarePlan = (id: string) => {
  const dispatch = useDispatch()
  const [carePlan, setCarePlan] = useState<CarePlan>()
  const [getOne, { data, loading, client }] = useGet_One_Care_PlanLazyQuery()

  useEffect(() => {
    if (id) {
      getOne({
        variables: {
          id_: id,
          type: GqlCarePlanType.Workspace
        }
      })
    }
  }, [id])

  const getOneCarePlan = {
    query: Get_One_Care_PlanDocument,
    fetchPolicy: "no-cache" as FetchPolicy,
    variables: {
      id_: id,
      type: GqlCarePlanType.Workspace
    }
  }
  useEffect(() => {
    if (id) {
      client && client.query(getOneCarePlan).then((res) => {
        dispatch(actions.setCurrentCarePlan(res.data?.carePlan?.one as unknown as CarePlan))
        if (res.data?.carePlan?.one.uiJson !== ""){
          dispatch(
            widgetActions.saveWidgets(
              {
                maxId: '', 
                widgets: JSON.parse(
                  res.data?.carePlan?.one.uiJson.replace(/'/g, '"').replace(/True/g, 'true').replace(/False/g, 'false')
                )
              }
            )
          )
        } else {
          dispatch(
            widgetActions.saveWidgets(
              {
                maxId: '', 
                widgets: []
              }
            )
          )
        }
      })
    }
  }, [id, client])

  // useEffect(() => {
  //   dispatch(actions.setCurrentCarePlan(data?.carePlan?.one as unknown as CarePlan))
  // }, [])

  return {
    carePlan,
    setCarePlan
  }
}

export default useGetOneCarePlan
