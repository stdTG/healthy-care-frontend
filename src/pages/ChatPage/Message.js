import React from 'react';
import Link from '@material-ui/core/Link';
import { format } from 'date-fns';

import { CardContent, Container, Card } from 'pages/ChatPage/styled/message';
import { Menu, Typography } from 'components/ui';
import { useTranslation } from 'react-i18next';

const Message = (currentUserId) =>
  function Message(props) {
    const { message, onDeleteMessage, channel } = props;
    const { t } = useTranslation();

    const options = [
      {
        icon: 'trash-alt',
        label: t('Delete message'),
        onClick: () => {
          onDeleteMessage({ ...message, messageType: 'admin' });
        },
        color: 'warning',
      },
    ];
    const isMyMessage = currentUserId === message?.sender?.userId;
    return (
      message?.sender?.userId && (
        <Container isMyMessage={isMyMessage}>
          <Card>
            <CardContent isMyMessage={isMyMessage}>
              <div>
                {channel.memberCount > 2 && (
                  <Typography variant="caption" color="textSecondary">
                    {message.sender && message.sender.nickname}
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  style={{ width: 360, paddingTop: '4px' }}
                >
                  {message.messageType === 'file' ? (
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      variant="body2"
                      href={message.url}
                    >
                      {message.name}
                    </Link>
                  ) : (
                    `${message.message}`
                  )}
                </Typography>
                <Typography
                  variant="caption"
                  style={{
                    color: 'black',
                    opacity: '0.7',
                  }}
                >
                  {format(message.createdAt, 'MMM do, h:mma')}
                </Typography>
              </div>
              {isMyMessage && <Menu options={options} />}
            </CardContent>
          </Card>
        </Container>
      )
    );
  };

export default Message;
