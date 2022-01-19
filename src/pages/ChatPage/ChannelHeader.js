import React from 'react';
import { Menu, Typography } from 'components/ui';
import { filter } from 'ramda';

function ChannelHeader(props) {
  const { channel, user } = props;

  const users = filter((item) => item.userId !== user.userId, channel.members);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid #eee',
        height: '50px',
      }}
    >
      <Typography
        style={{
          alignSelf: 'center',
        }}
      >
        {users.map((c) => c.nickname).join(', ')}
      </Typography>
    </div>
  );
}

export default ChannelHeader;
