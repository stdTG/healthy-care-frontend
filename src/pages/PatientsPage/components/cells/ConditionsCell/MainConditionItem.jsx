import React from 'react'
import { Icon } from "components/ui"
import { ChipWithIcons } from "../../../components"


export const MainConditionItem = React.memo(({ condition }) => {
  
  return (
    <ChipWithIcons
    //   color={RISK_COLORS[metric?.risk]}
      label={condition?.name}
    //   startIcon={<Icon icon={getIcon(metric.metricType)} />}
      endIcon={<Icon icon="angle-double-up" style={{ width: '8px' }} />}
      margin='0 12px 12px 0'
    />
  )
})

