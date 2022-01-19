import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { useCreate } from 'pages/CarePlans/_service/hooks/useCreate';
import { useUpdate } from 'pages/CarePlans/_service/hooks/useUpdate';
import { CarePlan } from '../models';
import { actions } from '../carePlanService';
import { FormApi } from 'final-form';

let _form: FormApi | undefined;

export function useSaveHandler(form?: FormApi) {

  const dispatch = useDispatch();
  const moduleState = useSelector((state: RootState) => state.carePlans);
  // const { create } = useCreate(moduleState.currentType);
  // const { update } = useUpdate(moduleState.currentType);

  if (form) {
    _form = form;
  }

  // const save = async (values: CarePlan) => {
  //   dispatch(actions.setBuilder_Data(values));
  //   if (moduleState.builder.isNew) {
  //     create(values);
  //   } else {
  //     update(values);
  //   }
  // };

  const submit = () => {
    if (!_form) return;
    _form.submit();
  }

  // return {save, submit};
}
