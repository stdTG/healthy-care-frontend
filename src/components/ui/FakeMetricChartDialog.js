import React, { FC, useEffect, useState } from 'react';
import FormDialog from '../../components/Dialogs/FormDialog';
import { useTranslation } from 'react-i18next';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  Tooltip,
} from 'recharts';

const FakeMetricChartDialog = (props) => {
  const { close, initialData, isOpen } = props;

  const { t } = useTranslation();

  const actions = [];

  function onSave() {
    close({});
  }

  const dataLineChart = [
    {
      name: '02/06',
      line1: 120,
      line2: 20,
    },
    {
      name: '04/06',
      line1: 135,
      line2: 30,
    },
    {
      name: '06/06',
      line1: 125,
      line2: 50,
    },
    {
      name: '08/06',
      line1: 180,
      line2: 70,
    },
    {
      name: '10/06',
      line1: 230,
      line2: 80,
    },
    {
      name: '14/06',
      line1: 180,
      line2: 100,
    },
    {
      name: '16/06',
      line1: 205,
      line2: 110,
    },
  ];

  return (
    // @ts-ignore
    <FormDialog
      title={initialData}
      onSubmit={onSave}
      actions={actions}
      onClose={close}
      {...props}
    >
      {() => {
        return (
          <>
            <LineChart
              width={500}
              height={300}
              data={dataLineChart}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine
                y={220}
                strokeWidth={2}
                label="High risk"
                stroke="red"
              />
              <ReferenceLine
                y={160}
                strokeWidth={2}
                label="Medium risk"
                stroke="#ffc658"
              />

              <Line
                name={initialData}
                type="monotone"
                dataKey="line1"
                stroke="#82ca9d"
                // activeDot={{ r: 4 }}
                dot={{ r: 3, strokeWidth: 3 }}
                // dot={<CustomizedDot />}
                strokeWidth={3}
                connectNulls
              />
            </LineChart>
          </>
        );
      }}
    </FormDialog>
  );
};

export default FakeMetricChartDialog;
