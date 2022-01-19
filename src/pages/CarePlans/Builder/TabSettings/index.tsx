import React, { FC } from 'react';
import styled from 'styled-components';
import CarePlanForm from 'pages/CarePlans/Builder/TabSettings/CarePlanForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';
import {useParams} from 'react-router-dom'
import useGetOneCarePlan from '../../_service/hooks/useGetOneCarePlan';

interface Props {
}

const TabSettings: FC<Props> = (props) => {
  const moduleState = useSelector((state: RootState) => state.carePlans);
  const { id_ } = useParams<any>()

  const {carePlan} = useGetOneCarePlan(id_)

  return (
    <SFormWrap>
      <CarePlanForm/>
    </SFormWrap>
  )
};

export default TabSettings;

const SFormWrap = styled.div`
  margin: 0 auto;
  background-color: white;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  box-shadow: 0px 0px 36px 5px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 36px 5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 36px 5px rgba(0, 0, 0, 0.1);
`;
