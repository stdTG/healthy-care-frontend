import React from 'react';
import { Avatar, Badge, Box, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AntonySantos from 'assets/avatarImages/AntonySantos.png';
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
    padding: theme.spacing(4),
    paddingTop: theme.spacing(6),
    position: 'relative',
    borderRadius: theme.spacing(3),
  },
  topPart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: theme.spacing(3),
    width: '100%',
    border: '1px solid #e0e0e0',
    padding: theme.spacing(1, 2),
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  chatInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    borderBottom: '1px solid #e0e0e0',
    cursor: 'pointer',
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
  filter: {
    background: '#fff7EB',
    color: '#f19D3A',
    padding: theme.spacing(0.5, 2),
    borderRadius: theme.spacing(1.5),
  },
  active: {
    color: '#2164E8',
    maxWidth: 120,
    textAlign: 'center',
    lineHeight: 1,
  },
}));

const ChatList = () => {
  const classes = useStyles();

  const users = [
    {
      name: 'Laure Andreas',
      description: 'You are welc...',
      date: 'Sat',
      avatar: LaureAndreas,
    },
    {
      name: 'Richard Oconnor',
      description: 'Hi there...',
      date: 'Wed',
      avatar: RichardOConnor,
      unread: true,
    },
    {
      name: 'Patricia Sousa',
      description: 'Ok, that wor...',
      date: 'Wed',
      avatar: PatriciaSousa,
    },
    {
      name: 'Fatma Hamed',
      description: 'Got it, thank...',
      date: 'Wed',
      avatar: FatmaHamed,
    },
    {
      name: 'Audrey Tyler',
      description: 'Got it, thank...',
      date: '09/15',
      avatar: AudreyTyler,
      unread: true,
    },
    {
      name: 'Francis Page',
      description: 'I amm goinng to...',
      date: '09/07',
      avatar: FrancisPage,
      unread: true,
    },
  ];

  return (
    <Paper className={classes.paper}>
      <div className={classes.topPart}>
        <Typography variant="h4">345 users</Typography>
        <div className={classes.filter}>No filters</div>
      </div>
      {users.map((user) => (
        <Box display="flex" className={classes.chatInfo}>
          <Badge variant="dot">
            <Avatar src={user.avatar} className={classes.avatar} />
          </Badge>
          <Box width="100%">
            <Typography className={classes.name}>{user.name}</Typography>
            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Typography>
                {user.description}
                {user.date ? `∙${user.date}` : ''}
              </Typography>
              {user.unread && (
                <Typography className={classes.active}>
                  Unread messages
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default ChatList;
