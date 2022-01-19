import React from 'react';
import { filter } from 'ramda';

import Typography from '@material-ui/core/Typography';
import { Paper, CardContent } from 'pages/ChatPage/styled/channelPreview';
import { Menu } from 'components/ui';

function ChannelPreview(props) {
  const { channel, onLeaveChannel, currentChannelUrl, currentUserId } = props;

  const filtered = filter(
    (item) => item.userId !== currentUserId,
    channel.members
  );

  const options = [
    {
      icon: 'volume-slash',
      label: 'Mute',
      onClick: () => {},
    },
    {
      icon: 'trash-alt',
      label: 'Delete chat',
      onClick: async () => {
        onLeaveChannel(channel);
      },
      color: 'warning',
    },
  ];

  return (
    <Paper variant="outlined" isSelected={currentChannelUrl === channel.url}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent isSelected={currentChannelUrl === channel.url}>
          <Typography component="h5" variant="h5">
            {filtered.map((c) => c.nickname || c.userId).join(', ')}
          </Typography>
          <Menu options={options} />
        </CardContent>
      </div>
    </Paper>
  );
}

export default ChannelPreview;
