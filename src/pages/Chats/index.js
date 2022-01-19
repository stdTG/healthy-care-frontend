import React from 'react';
import { PageContainer } from './styled';
import {
  Button,
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  Badge,
} from '@material-ui/core';
import { Icon, Search } from 'components/ui';
import { makeStyles } from '@material-ui/core/styles';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import NearMeIcon from '@material-ui/icons/NearMe';
import ChatList from './ChatList';
import HistoryList from './HistoryList';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  search: {
    margin: theme.spacing(0, 4),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  tab: {
    width: '100%',
    whiteSpace: 'no-wrap',
    borderRadius: theme.spacing(3),
    color: 'black',
  },
  paper: {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(7),
    position: 'relative',
    borderRadius: theme.spacing(3),
  },
  subject: {
    position: 'absolute',
    borderRadius: theme.spacing(3),
    width: '100%',
    border: '1px solid #e0e0e0',
    padding: theme.spacing(1, 2),
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  textarea: {
    width: '100%',
    marginTop: theme.spacing(3),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2, 2),
    '&:focus': {
      outline: 'none',
    },
  },
  chatBox: {
    position: 'relative',
  },
  actionWrapper: {
    position: 'absolute',
    bottom: theme.spacing(1),
    width: '100%',
    left: 0,
    color: '#A0A0A0',
    padding: theme.spacing(1, 2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  activeButton: {
    color: '#2164E8',
    border: '1px solid #2164E8',
  },
  active: {
    color: '#2164E8',
  },
}));

const ChatsPage = () => {
  const classes = useStyles();

  return (
    <PageContainer>
      <Box display="flex" marginBottom={4}>
        <Button color="primary" variant="contained">
          <SyncAltIcon className={classes.icon} />
          Change to user chats
        </Button>
        <Search placeholder="Search users..." className={classes.search} />
        <Button color="default" variant="contained">
          <Icon icon="comment" mr={8} />
          New Message
        </Button>
      </Box>
      <Grid container spacing={6}>
        <Grid item md={4} lg={4}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Button
                color="default"
                variant="contained"
                className={clsx(classes.tab, classes.activeButton)}
              >
                <Icon icon="comment" mr={8} />
                User Chats
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                color="default"
                variant="contained"
                className={classes.tab}
              >
                <Icon icon="comments" mr={8} />
                Group Chats
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ChatList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8} lg={8}>
          <Paper className={classes.paper}>
            <div className={classes.subject}>
              <Typography>
                Dr.Mariah Malachan∙Sub org 01 ∙ Care team 03 ∙ Surgeon
              </Typography>
              <Typography>16h10</Typography>
            </div>
            <HistoryList />
            <div className={classes.chatBox}>
              <textarea
                className={classes.textarea}
                placeholder="Write your message to Dr. Mariah Malachan..."
                rows={5}
              />
              <div className={classes.actionWrapper}>
                <Box display="flex">
                  <Icon icon="microphone" mr={50} />
                  <Icon icon="map-marker" mr={50} />
                  <Icon icon="image" mr={50} />
                </Box>
                <NearMeIcon className={classes.active} />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ChatsPage;
