import TabSettings from '../../Builder/TabSettings';
import React, { useState } from 'react';
import TabBuild from '../../Builder/TabBuild';
import TabPublish from '../../Builder/TabPublish';
import { GqlCarePlanType } from '../../../../generated/graphql';
import { CarePlan } from '../../models';
import { useDispatch } from 'react-redux';
import { actions } from '../../carePlanService';
import useGetJson from './useGetJson';

function getSteps() {
  return ['Settings', 'Clinical builder', 'Publish'];
}

const useStepperFunctions = (
  graph: any,
  setGraph: any,
  graphData: any,
  setGraphData: any,
  id_: string,
  carePlanId: string,
  carePlanJson: string,
  onLoadCarePlanJson: (carePlanId: string, carePlanJson: string) => Promise<CarePlan>,
  onSaveCarePlanSettings: (values: CarePlan) => Promise<any>,
  onCarePlanSettingsUpdate: (type: GqlCarePlanType, values: CarePlan) => Promise<any>,
  saveStep: (step: string) => void,
  currentStepNumber: number,
  widgets: any,
) => {
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = useState(currentStepNumber || 0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  console.log(graph?.getChildCells(), 'GRAPPG')
  const { getJson } = useGetJson(graph)

  const steps = getSteps();

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <TabSettings/>;
      case 1:
        // @ts-ignore
        return <TabBuild
          carePlanId={id_ || carePlanId}
          carePlanJson={carePlanJson}
          graphData={graphData}
          setGraphData={setGraphData}
          graph={graph}
          setGraph={setGraph}
        />;
      case 2:
        return <TabPublish/>;
      default:
        return 'Unknown step';
    }
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const isFirstStep = () => {
    return activeStep === 0;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = async (values?: any) => {
    //ToDo remove condition and add function saveBuildStep
    if (activeStep === 1) {
      const json = getJson()
      const response = await onLoadCarePlanJson(carePlanId , json as string)
      if (response) {
        dispatch(actions.updateCurrentCarePlan(response))
        dispatch(actions.updateCarePlan(response))
      }
      return
    }

    const response = await onSaveCarePlanSettings(values);

    if (response?.ok) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
      setCompleted({
        ...completed,
        [newActiveStep - 1]: true
      });
    }
  };

  const handleNextWithEditMode = async (values?: any, carePlanId?: string) => {
    if (carePlanId) {
      id_ = carePlanId
    }
    if (activeStep === 1) {
      const response = await onLoadCarePlanJson(id_ as string, widgets as string)
      // dispatch(actions.setJson(response.uiJson))
      dispatch(actions.updateCarePlan(response))
      dispatch(actions.updateCurrentCarePlan(response))

      // //@ts-ignore
      // if (response?.ok) {
      //   const newActiveStep =
      //     isLastStep() && !allStepsCompleted()
      //       ? steps.findIndex((step, i) => !(i in completed))
      //       : activeStep + 1;
      //   setActiveStep(newActiveStep);
      //   setCompleted({
      //     ...completed,
      //     [newActiveStep - 1]: true
      //   });
      // }

      return
    }

    const response = await onCarePlanSettingsUpdate(GqlCarePlanType.Workspace, {...values, id_});

    if (response?.ok) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
      setCompleted({
        ...completed,
        [newActiveStep - 1]: true
      });
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    const completedSteps = Object.keys(completed)

    const isCompletedStep = completedSteps?.includes(step.toString())
    const prevStepIsCompleted = completedSteps?.includes(( step - 1 ).toString())

    if (!isCompletedStep && !prevStepIsCompleted) {
      return
    }

    setActiveStep(step);
    saveStep(step.toString())
  };

  const getActiveStep = (step: number) => {
    const completedSteps = Object.keys(completed)
    const prevStepIsCompleted = completedSteps?.includes((step - 1).toString())
    if (step === 0) {
      return true
    }

    return prevStepIsCompleted;
  }

  return {
    activeStep,
    steps,
    getStepContent,
    totalSteps,
    completedSteps,
    isLastStep,
    isFirstStep,
    allStepsCompleted,
    handleNext,
    handleNextWithEditMode,
    handleBack,
    handleStep,
    getActiveStep,
    completed,
    setCompleted,
  }
}

export default useStepperFunctions
