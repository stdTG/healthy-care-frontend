import React, { FC, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';
import {useParams} from 'react-router-dom'
import useGetOneCarePlan from '../../_service/hooks/useGetOneCarePlan';

import { useTranslation } from 'react-i18next';

import moment from "moment";

import {
  FormTextField,
  FormControl,
  DatePicker,
  Input,
  Space,
  Icon,
} from 'components/ui';

interface Props {
}

const TabPublish: FC<Props> = (props) => {
  const moduleState = useSelector((state: RootState) => state.carePlans);
  const { id_ } = useParams<any>()

  const { t } = useTranslation();

  const [selectedDate, setDate] = useState(moment());
  // const [selectedDate, setDate] = useState(new Date(''));

  const {carePlan} = useGetOneCarePlan(id_)

  return (
    <SFormWrap>
      <div style={{width: '50%'}}>
        <FormControl label={t('Version name')}>
          <FormTextField name="Version name" placeholder={t('Version name')} value={'version1'} autoFocus={true} />
        </FormControl>

        <FormControl label={t('Publication date')}>
          <DatePicker
            name="publicationDate"
            id="version-publish-date"
            placeholder="dd/mm/yyyy"
            // format="dd/MM/yyyy"
            format="yyyy-mm-dd"
            // value={"Mon Oct 11 2021 14:57:00 GMT+0200 (Central European Summer Time)"}
            // value={new Date('')}
            // value={() => { return new Date('')}}
            value={selectedDate}
            openTo="date"
            variant="inline"
            disableFuture={false}
            KeyboardButtonProps={{
              'aria-label': 'change publication date',
            }}
            inputVariant="outlined"

            // onAccept={(e: any, value: any) => {
            //   console.log("accept")
            //   console.log(e)
            //   console.log(value)
            // }}
            
          />
        </FormControl>



     </div>
      
    </SFormWrap>
  )
};

export default TabPublish;

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
