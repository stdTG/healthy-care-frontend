import styled from 'styled-components';
import colors from 'lib/colors';

export const ChatContainer = styled.div`
  padding: 24px;
  height: 95vh;

  .sendbird-app__wrap,
  .sendbird-app__channellist-wrap,
  .sendbird-conversation {
    border: none;
  }

  .sendbird-app__wrap {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  }

  .sendbird-conversation {
    border-left: 1px solid ${colors.gray500};
  }
  .sendbird-message-input {
    margin-top: 16px;
  }
  .sendbird-message-input--textarea {
    border-color: ${colors.gray500} !important;
    border-radius: 16px;
    &:focus {
      border-color: ${(props) => props.theme.palette.primary.main} !important;
      box-shadow: none !important;
    }
  }
`;

export const Chat = styled.div`
  margin-left: 30px;
  border-radius: 18px;
  overflow: hidden;

  .sendbird-conversation {
    border: none;
  }

  .sendbird-message-input--textarea {
    border-color: ${colors.gray500} !important;
    &:focus {
      border-color: ${(props) => props.theme.palette.primary.main} !important;
      box-shadow: none !important;
    }
  }
  .sendbird-notification {
    background-color: ${(props) => props.theme.palette.primary.main} !important;
  }
  .icon-chat_svg__fill {
    fill: ${(props) => props.theme.palette.primary.main};
  }
`;

export const List = styled.div`
  .sendbird-channel-list {
    border: none;
    background: none;
  }

  .sendbird-channel-header {
    background: none;
    border: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .sendbird-channel-header__right-icon {
    position: relative;
    top: auto;
    right: auto;
  }

  .icon-spinner-large_svg__fill {
    fill: ${(props) => props.theme.palette.primary.main};
  }
`;
