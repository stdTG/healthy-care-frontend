import { fade } from '@material-ui/core/styles';
import palette from 'lib/colors/palette';

export const patientByAgeData = (canvas, labels) => {
  let ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, fade(palette.primary, 0.4));
  gradient.addColorStop(1, fade(palette.primary, 0));

  return {
    // labels: labels,
    labels: [0, '', '', '', '', '', '', '', '', '', 100],
    datasets: [
      {
        backgroundColor: gradient,
        label: '',
        borderColor: palette.primary,
        borderWidth: 1,
        pointRadius: 0,
        data: [2, 10, 5, 30, 15, 8, 12, 17, 0, 2, 0],
      },
    ],
  };
};
