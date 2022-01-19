import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { actions } from '../../carePlanService';

const useGetCarePlanVariables = (widgets: any) => {
  const dispatch = useDispatch()
  return useMemo(() => {
    const variables = widgets
      .filter((cell: any) => cell.vertex && cell.value?.variableName)
      .map((cell: any) => (
        {
          id: cell.id,
          variableName: cell.value?.variableName
        }
      ));
    dispatch(actions.setCarePlanVariables({ variables }))
  }, [widgets])
};

export default useGetCarePlanVariables
