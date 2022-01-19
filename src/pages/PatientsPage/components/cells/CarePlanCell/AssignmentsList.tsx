import styled from "styled-components"
import { format, parseISO } from 'date-fns';
import { Typography } from '@material-ui/core';
import { CircularProgress } from 'components/ui';
import { ChipLabel } from "../.."

interface IAssignmentsListProps {
  assignments: any[] // Temprry type. Must be Assignment[] in the future
}

const AssignmentsList = ({ assignments }: IAssignmentsListProps) => (
  <div>
    {
      assignments && assignments.map((assignment, idx) => (
        assignment && <div key={assignment.carePlan?.name}>
          <ChipLabel
            label={assignment.carePlan?.name}
            background='#00a152'
            color='#fff'
            borderRadius='10px'
            lineHeight='1.1rem'
            margin='0 12px 0 0'
          />
          <DaysStatusContainer>
            <CircularProgress
            // color={statusColor[label?.status]}
            // value={label?.percent}
            />
            <Typography
              variant='caption'
            >
              {format(parseISO(assignments[idx].assigmentDateTime), 'MMM do')}
            </Typography>
          </DaysStatusContainer>
        </div>
      ))
    }
  </div>
)


export default AssignmentsList

const DaysStatusContainer = styled.div`
  display: flex;
  align-items:center;
  margin: 8px 0;
  
  > div:first-child {
    margin-right: 8px;
  }
`