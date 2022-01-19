import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import AssignmentsList from './AssignmentsList';
import ShowMoreButton from '../../buttons/ShowMoreButton';
import { Icon } from 'components/ui';

const CarePlanCell = ({ assignments }) => {

  const [isHidden, setIsHidden] = useState(true)
  const [displayedAssignments, setDisplayedAssignments] = useState([])

  useEffect(() => {
    isHidden
      ? setDisplayedAssignments([assignments[0]])
      : setDisplayedAssignments(assignments)
  }, [isHidden, assignments])

  return (
    <CarePlanCellContainer>
      <AssignmentsList assignments={displayedAssignments} />
      {
        displayedAssignments[0] && <ShowMoreButton 
        isHidden={isHidden}
        labelOnHidden={<Icon icon='chevron-down' />}
        labelOnDisplayed={<Icon icon='chevron-up' />}
        onClick={setIsHidden} 
      />
      }
    </CarePlanCellContainer>
  )
}

export default React.memo(CarePlanCell)

const CarePlanCellContainer = styled.div`
  display: flex;
`