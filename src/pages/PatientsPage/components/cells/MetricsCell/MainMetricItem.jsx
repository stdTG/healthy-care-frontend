import React, { useState } from 'react';

import { Icon } from "components/ui"
import { ChipWithIcons } from "../../../components"
import { metricTypes } from 'lib/enums/metrics';
import { TemperatureItem } from './TemperatureItem';

import useDialog from 'lib/hooks/useDialog';
import FakeMetricChartDialog from 'components/ui/FakeMetricChartDialog';

const METRICS = {
  '1': 'Weight',
  '2': 'Height',
  '3': 'Heart rate',
  '4': 'Bmi',
  '5': 'Cough',
  '6': 'Temperature',
};

const RISK_COLORS = {
  NORMAL: 'black',
  LOW: '#F29D3A',
  HIGH: '#F13A61',
}

const getIcon = (metricType) => {
  switch (metricType) {
    case metricTypes.weight:
      return 'weight'
    case metricTypes.height:
      return 'ruler-vertical'
    case metricTypes.bmi:
      return 'male'
    case metricTypes.cough:
      return 'head-side-cough'
    case metricTypes.heartRate:
      return 'heartbeat'
    default: return null
  }
}

export const MainMetricItem = React.memo(({ metric }) => {
  const fakeMetricGraphDialog = useDialog();
  const [metricForGraph, setMetricForGraph] = useState("");


  if (metric?.metricType === metricTypes.temperature) {
    return <TemperatureItem label={metric?.value} color={RISK_COLORS[metric?.risk]}/>
  }
  
  return (
    <>
      <ChipWithIcons
        color={RISK_COLORS[metric?.risk]}
        label={metric?.value}
        startIcon={<Icon icon={getIcon(metric.metricType)} />}
        endIcon={<Icon icon="angle-double-up" style={{ width: '8px' }} />}
        margin='0 12px 12px 0'
        onClick={() => {
          setMetricForGraph(METRICS[metric.metricType])
          fakeMetricGraphDialog.open(metricForGraph)
        }}
      />

      <FakeMetricChartDialog
        isOpen={fakeMetricGraphDialog.isOpen}
        close={fakeMetricGraphDialog.close}
        initialData={metricForGraph}
      />
    </>
  )
})

