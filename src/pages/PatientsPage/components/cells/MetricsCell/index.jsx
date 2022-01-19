import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { TableContext } from 'pages/PatientsPage';
import { MainMetricItem } from './MainMetricItem';
import ShowMoreButton from 'pages/PatientsPage/components/buttons/ShowMoreButton';
import Icon from 'components/ui/Icon';

const RISKS = {
  NORMAL: 1,
  LOW: 5,
  HIGH: 10,
}

const MetricsCell = ({ metrics }) => {
  const { filtersOpened } = useContext(TableContext)
  const [isHidden, setIsHidden] = useState(true)
  
  const sortedMetrics = metrics
    ?.map((metric) => ({...metric, riskAsNumber: RISKS[metric.risk]}))
    ?.sort((a, b) => b.riskAsNumber - a.riskAsNumber)
  
  try {
    return (
      <MetricsCellContainer>
        <MainMetricItem metric={sortedMetrics[0]} />
        {
          !filtersOpened || !isHidden
            ? <>
              {sortedMetrics.slice(1).map((metric, idx) => {
                  return <MainMetricItem key={metric.id} metric={metric}/>
                })}
              {
                filtersOpened
                  ? <ShowMoreButton
                    isHidden={isHidden}
                    labelOnHidden={`+${metrics?.length - 1}`}
                    labelOnDisplayed={<Icon icon="chevron-left" />}
                    onClick={setIsHidden}
                  />
                  : null
              }
            </>
            : metrics.length > 1 && <ShowMoreButton
              isHidden={isHidden}
              labelOnHidden={`+${metrics?.length - 1}`}
              labelOnDisplayed={<Icon icon="chevron-left" />}
              onClick={setIsHidden}
            />
        
        }
      </MetricsCellContainer>
    )
  } catch (err) {
    console.error(err)
    return (
      <div />
    )
  }
}

export default MetricsCell

const MetricsCellContainer = styled.div`
  display: flex;
  flex-wrap: wrap;  
`
