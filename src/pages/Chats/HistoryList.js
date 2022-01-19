import React from 'react';
import { Avatar, Badge, Box, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AntonySantos from 'assets/avatarImages/AntonySantos.png';
import AnneAdler from 'assets/avatarImages/AnneAdler.png';
import AudreyTyler from 'assets/avatarImages/AudreyTyler.png';
import BarbaraKerr from 'assets/avatarImages/BarbaraKerr.png';
import CarlaRossi from 'assets/avatarImages/CarlaRossi.png';
import ClareMendoza from 'assets/avatarImages/ClareMendoza.png';
import FatmaHamed from 'assets/avatarImages/FatmaHamed.png';
import FrancisPage from 'assets/avatarImages/FrancisPage.png';
import JohnSimon from 'assets/avatarImages/JohnSimon.png';
import LaureAndreas from 'assets/avatarImages/LaureAndreas.png';
import LongDang from 'assets/avatarImages/LongDang.png';
import MichaelKumbala from 'assets/avatarImages/MichaelKumbala.png';
import PatriciaSousa from 'assets/avatarImages/PatriciaSousa.png';
import PaulDoyle from 'assets/avatarImages/PaulDoyle.png';
import RichardOConnor from 'assets/avatarImages/RichardOConnor.png';
import RobertMontgomery from 'assets/avatarImages/RobertMontgomery.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  chatInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2.5, 0),
    borderBottom: '1px solid #E0E0E0',
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  name: {
    fontWeight: 700,
  },
  date: {
    color: '#A0A0A0',
    marginLeft: theme.spacing(1),
  },
}));

const HistoryList = () => {
  const classes = useStyles();

  const histories = [
    {
      name: 'Dr. Adler',
      description: 'Hello Mrs Andreas, how are you feeling today?',
      date: '9h23 10/10',
      avatar: AnneAdler,
    },
    {
      name: 'Mrs Andreas',
      description:
        "My mood is  bad today and I’m anxious. I've been sleeping badly for 3 days.",
      date: '9h25 10/10',
      avatar: LaureAndreas,
    },
    {
      name: 'Dr. Adler',
      description: 'Something new has happened ?',
      date: '12h07 Sat',
      avatar: AnneAdler,
    },
    {
      name: 'Mrs Andreas',
      description:
        'No, In fact, I am worried about returning to my work and not feeling capable of taking it all on. I feel disheartened, and lacking energy today.',
      date: '13h22 Sat',
      avatar: LaureAndreas,
    },

    {
      name: 'Dr. Adler',
      description: 'Do you have negative thoughts ?',
      date: '13h24 Sat',
      avatar: AnneAdler,
    },
    {
      name: 'Mrs Andreas',
      description: 'No, but I feel  disheartened when I think about my job.',
      date: '13h40 Sat',
      avatar: LaureAndreas,
    },
    {
      name: 'Dr. Adler',
      description:
        "Mrs Andreas, you have just started your medication. In a few days we will be able to assess the effectiveness of your treatment.For while you have do all exercices we propose to manage your emotions better. Tomorrow you’ll have an appointment with your psychologist Mr Simon and if you need I'll arrange another appointment for you before the scheduled date. Does it sounds good for you Mrs Andreas?",
      date: '13h47 Sat',
      avatar: AnneAdler,
    },
    {
      name: 'Mrs Andreas',
      description: 'Yes Dr Adler, thank you so much, I fell reassured.',
      date: '14h01 Sat',
      avatar: LaureAndreas,
    },
    {
      name: 'Dr. Adler',
      description: 'You are welcome Mrs Andreas, take care and see you soon.',
      date: '14h07 Sat',
      avatar: AnneAdler,
    },
  ];

  return (
    <>
      {histories.map((history, index) => (
        <Box key={index} display="flex" className={classes.chatInfo}>
          <Badge variant="dot">
            <Avatar src={history.avatar} className={classes.avatar} />
          </Badge>
          <Box>
            <Box display="flex">
              <Typography className={classes.name}>{history.name}</Typography>
              <Typography className={classes.date}>
                {history.date ? `∙ ${history.date}` : ''}
              </Typography>
            </Box>
            <Typography>{history.description}</Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default HistoryList;
