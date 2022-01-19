import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import {
//   SendBirdProvider,
//   ChannelList,
//   Channel,
//   ChannelSettings,
//   SendBirdSelectors, sendBirdSelectors
// } from 'sendbird-uikit/dist';
import 'sendbird-uikit/dist/index.css';
import { App as SendBirdApp } from 'sendbird-uikit';

import { getModuleState as getAuthModuleState } from 'services/auth';
import colorSet from './styled/chatPalette';
import { Chat, ChatContainer, List } from './styled/chatPage';
import ChannelPreview from './ChannelPreview';
import ChannelHeader from './ChannelHeader';
import ListHeader from './ListHeader';
import Message from './Message';
import config from 'config';
import SendBird from 'sendbird';

function ChatPage(props) {
  const { theme } = props;
  const history = useHistory();
  const authState = useSelector(getAuthModuleState);
  const appId = authState.sendbirdData.appId;
  const userId = authState.username;
  const nickname = authState.username;
  const accessToken = authState.sendbirdData.accessToken;
  const urlParams = new URLSearchParams(history.location.search);
  const params = Object.fromEntries(urlParams);

  useEffect(() => {
    if (!userId || !nickname) {
      console.error('Error, empty userId or nickname');
    }
  }, [userId, nickname, history]);

  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);

  return (
    <ChatContainer>
      <SendBirdApp
        appId={appId}
        userId={userId}
        nickname={nickname}
        colorSet={colorSet}
      />
      {/*<SendBirdProvider*/}
      {/*  appId={appId}*/}
      {/*  theme={theme}*/}
      {/*  userId={userId}*/}
      {/*  colorSet={colorSet}*/}
      {/*  accessToken={accessToken}*/}
      {/*>*/}
      {/*  <div className="sendbird-app__wrap">*/}
      {/*    <List className="sendbird-app__channellist-wrap">*/}
      {/*      <ChannelList*/}
      {/*        allowProfileEdit={true}*/}
      {/*        renderUserProfile={() => <div>user profile</div>}*/}
      {/*        renderHeader={ListHeader}*/}
      {/*        renderChannelPreview={(props) => (*/}
      {/*          <ChannelPreview*/}
      {/*            {...{ ...props, currentUserId: userId, currentChannelUrl }}*/}
      {/*          />*/}
      {/*        )}*/}
      {/*        onChannelSelect={(channel, elsee) => {*/}
      {/*          if (channel && channel.url) {*/}
      {/*            setCurrentChannelUrl(channel.url);*/}
      {/*          }*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </List>*/}
      {/*    <Chat className="sendbird-app__conversation-wrap">*/}
      {/*      <Channel*/}
      {/*        renderChatItem={Message(userId)}*/}
      {/*        channelUrl={currentChannelUrl}*/}
      {/*        onChatHeaderActionClick={() => {*/}
      {/*          setShowSettings(true);*/}
      {/*        }}*/}
      {/*        renderChatHeader={ChannelHeader}*/}
      {/*      />*/}
      {/*    </Chat>*/}
      {/*  </div>*/}
      {/*  {showSettings && (*/}
      {/*    <div className="sendbird-app__settingspanel-wrap">*/}
      {/*      <ChannelSettings*/}
      {/*        channelUrl={currentChannelUrl}*/}
      {/*        onCloseClick={() => {*/}
      {/*          setShowSettings(false);*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</SendBirdProvider>*/}
    </ChatContainer>
  );
}

export default ChatPage;
