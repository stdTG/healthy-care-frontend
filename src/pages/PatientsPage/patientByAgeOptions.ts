export const optionsForLine = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    display: false,
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
};

export const colorsForLinearProgressByRisk = [
  {
    id: 0,
    color: '#F29D3A',
  },
  {
    id: 1,
    color: '#00AE4F',
  },
  {
    id: 2,
    color: '#F23A61',
  },
];
