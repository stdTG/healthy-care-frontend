import React, { useEffect, useState } from 'react';

import { Button, CircularProgress } from '@material-ui/core';
import { Icon } from 'components/ui';
import Title from 'pages/CarePlans/Builder/Main/Title';
import BackButton from 'pages/CarePlans/Builder/Main/BackButton';
import SaveButton from 'pages/CarePlans/Builder/Main/SaveButton';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import useSaveCarePlanSettings from '../_service/hooks/useSaveCarePlanSettings';
import { Form } from 'react-final-form';
import { makeValidate } from 'mui-rff';
import { schema } from './TabSettings/validation';
import useLoadCarePlanScheme from '../_service/hooks/useLoadCarePlanScheme';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useGetOneCarePlan from '../_service/hooks/useGetOneCarePlan';
import useUpdateCarePlanSettings from '../_service/hooks/useUpdateCarePlanSettings';
import useStepperFunctions from '../_service/hooks/useStepperFunctions';
import { selectors, actions } from '../carePlanService';
import { adminSettingsTabs } from '../../../pagesAdmin/SettingsPage';
import { careTeamMemberRouteTemplates } from '../../../routing/routeTemplates';
import { selectors as widgetSelectors } from 'services/widget';
import { actions as widgetActions } from 'services/widget';

import { useTranslation } from 'react-i18next';

const validate = makeValidate(schema);

export const carePlanSteps = {
  settings: '1',
  builder: '2',
  publish: '3',
};

const CarePlanBuilder = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch()
  const currentStepNumber = location?.search.split('=')[1];
  const [currentStep, setCurrentStep] = useState(
    currentStepNumber || carePlanSteps.settings
  );
  const widgets = useSelector(widgetSelectors.getWidgets);
  const maxId = useSelector(widgetSelectors.getMaxId);
  const { id_ } = useParams<any>()
  const { t } = useTranslation();

  const saveStep = (stepNumber: string) => {
    setCurrentStep(stepNumber);
    history.push({
      pathname: location.pathname,
      search: `?step=${stepNumber}`,
    });
  };

  useGetOneCarePlan(id_)

  const [graph, setGraph] = useState(null);

  const [graphData, setGraphData] = useState({});

  const carePlansWorkSpace = useSelector(selectors.getCarePlansWorkspace);
  const currentCarePlan = useSelector(selectors.getCurrentCarePlan);

  const carePlanJson = currentCarePlan?.uiJson

  const { onSaveCarePlanSettings, loadingSaveCareSettings,  carePlanId } = useSaveCarePlanSettings();
  const { onCarePlanSettingsUpdate, loadingUpdateCarePlanSetting } = useUpdateCarePlanSettings()

  const { onLoadCarePlanJson, loadingCarePlanJson } = useLoadCarePlanScheme()

  // const carePlanRedux = carePlansWorkSpace?.find(
  //   (carePlan) => carePlan.id_ === id_
  // );

  const {
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
    setCompleted
  } = useStepperFunctions(
    graph,
    setGraph,
    graphData,
    setGraphData,
    id_,
    carePlanId!,
    carePlanJson as string,
    //TODO make normal type
    onLoadCarePlanJson as any,
    onSaveCarePlanSettings,
    onCarePlanSettingsUpdate,
    saveStep,
    (currentStepNumber && +currentStepNumber) || 0,
    widgets,
  );

  useEffect(() => {
    if (id_ && currentCarePlan?.uiJson) {
      setCompleted({
        // 0: true,
        1: true
      })
    }
  }, [currentCarePlan, id_])

  useEffect(() => {
    return () => {
      dispatch(actions.removeCurrentCarePlan())
    }
  }, [])

  const getLoadings = (index: number) => {
    switch (index) {
      case 0: {
        return loadingSaveCareSettings || loadingUpdateCarePlanSetting
      }
      case 1: {
        return loadingCarePlanJson
      }
      default: return false
    }
  }

  const onSaveWidgets = async (values: any) => {
    if (activeStep === 1){
      await handleNextWithEditMode(values, carePlanId)
    } else {
      id_ ? await handleNextWithEditMode(values) : await handleNext(values)
    }
  };

  return (
    <div>
      <Stepper nonLinear activeStep={activeStep} style={{
        backgroundColor: 'transparent',
        padding: '40px 70px'
      }}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              {getLoadings(index)? (
                <CircularProgress size={20}/>
              ) : (
                <StepButton
                  onClick={handleStep(index)}
                  completed={completed[index]}
                  active={getActiveStep(index)}
                >
                  {label}
                </StepButton>
              )}
            </Step>
          )
        })}
      </Stepper>

      <Form
        initialValues={id_ ? currentCarePlan : {}}
        onSubmit={onSaveWidgets}
        validate={validate}
      >
        {({ handleSubmit, values }) => {
          return (
            <div>
              <SHeader>
                <BackButton/>
                <Title/>
                <SButtonsWrap>
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    style={{ height: '100%' }}
                    onClick={handleBack}
                    disabled={isFirstStep()}
                  >
                    <Icon icon="arrow-left" mr={8}/>
                    {t('Back')}
                  </Button>
                  <div style={{ marginRight: '10px', marginLeft: '10px' }}>
                    <SaveButton onClick={handleSubmit}/>
                  </div>
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    style={{ height: '100%' }}
                    onClick={handleSubmit}
                    disabled={isLastStep()}
                  >
                    {t('Next')}
                    <Icon icon="arrow-right" ml={8}/>
                  </Button>
                </SButtonsWrap>
              </SHeader>

              <div style={{
                margin: '20px',
                overflow: 'hidden'
              }}>
                {getStepContent(activeStep)}
              </div>
            </div>
          );
        }}
      </Form>
    </div>
  );
};

export default CarePlanBuilder;

const SHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px 0;
`;

const SButtonsWrap = styled.div`
  display: flex;
`;

