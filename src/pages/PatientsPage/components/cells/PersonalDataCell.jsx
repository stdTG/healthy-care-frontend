import React from 'react'
import styled from 'styled-components'
import { convertToTitleCase, countAge } from 'lib/utils';
import { useHistory } from 'react-router-dom'
import { sexData, SEX } from 'lib/enums/sex';
import { Typography } from '@material-ui/core';
import { Icon } from 'components/ui';

const PersonalDataCell = ({ id_, firstName, lastName, sex, birthDate }) => {
  const history = useHistory();

  function onCellClick () {
    history.push(`/patientRecord/${id_}`)
  }

  return (
    <PersonalDataCellContainer onClick={onCellClick}>
      <Typography>
        {convertToTitleCase(firstName)} {convertToTitleCase(lastName)}
      </Typography>
      <div>
        {sex !== SEX.undefined && (
          <>
            <Icon icon={sexData[sex].icon} size="1x" />
            <span className='dot' >&sdot;</span>
          </>
        )}
        {countAge(birthDate)}
      </div>
    </PersonalDataCellContainer>
  )
}

export default React.memo(PersonalDataCell)

const PersonalDataCellContainer = styled.div`
  cursor: pointer;
  align-self: flex-start;

  .dot {
    margin: 5px;
  }
`