import palette from 'lib/colors/palette';
import { fade } from '@material-ui/core/styles';

export const patientByLocationsData = [
  {
    locationName: 'Paris',
    totalPeople: 288,
    proportionOfPeople: 10,
  },
  {
    locationName: 'london',
    totalPeople: 26,
    proportionOfPeople: 1,
  },
  {
    locationName: 'Madrid',
    totalPeople: 320,
    proportionOfPeople: 20,
  },
  {
    locationName: 'Berlin',
    totalPeople: 88,
    proportionOfPeople: 33,
  },
];

export const gendersPercent = {
  datasets: [
    {
      data: [50, 35, 15],
      backgroundColor: [palette.primary, palette.warning, palette.info],
    },
  ],
  labels: ['Male', 'Female', 'Other'],
};

export const options = {
  legend: {
    display: false,
  },
  scales: {
    display: false,
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

export const patientByAgeData = (canvas) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, fade(palette.primary, 0.4));
  gradient.addColorStop(1, fade(palette.primary, 0));

  return {
    labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    datasets: [
      {
        backgroundColor: gradient,
        label: '',
        borderColor: palette.primary,
        borderWidth: 1,
        pointRadius: 2,
        data: [2, 10, 5, 30, 15, 8, 12, 17, 0, 2, 0],
      },
    ],
  };
};

export const mockPercents = {
  male: 50,
  female: 35,
  other: 15,
};
