import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { TableContext } from 'pages/PatientsPage';
import { MainConditionItem } from './MainConditionItem';
import ShowMoreButton from 'pages/PatientsPage/components/buttons/ShowMoreButton';
import Icon from 'components/ui/Icon';


const ConditionsCell = ({ conditions }) => {
  const { filtersOpened } = useContext(TableContext)
  const [isHidden, setIsHidden] = useState(true)
  

  try {
    return (
      <ConditionsCellContainer>
        <MainConditionItem condition={conditions[0]} />
        {
          !filtersOpened || !isHidden
            ? <>
              {conditions.slice(1).map((condition, idx) => {
                  return <MainConditionItem key={condition.id} condition={condition} />
                })}
              {
                filtersOpened
                  ? <ShowMoreButton
                    isHidden={isHidden}
                    labelOnHidden={`+${conditions?.length - 1}`}
                    labelOnDisplayed={<Icon icon="chevron-left" />}
                    onClick={setIsHidden}
                  />
                  : null
              }
            </>
            : conditions.length > 1 && <ShowMoreButton
              isHidden={isHidden}
              labelOnHidden={`+${conditions?.length - 1}`}
              labelOnDisplayed={<Icon icon="chevron-left" />}
              onClick={setIsHidden}
            />
        
        }
      </ConditionsCellContainer>
    )
  } catch (err) {
    console.error(err)
    return (
      <div />
    )
  }
}

export default ConditionsCell

const ConditionsCellContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  `
