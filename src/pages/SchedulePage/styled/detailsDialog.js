import { Box as MuiBox } from '@material-ui/core';
import styled from 'styled-components';
import { Typography, Avatar, Icon as CustomIcon } from 'components/ui';

const SDetailItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: baseline;
`;
const SDetailItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SActionsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;
`;

const SUser = styled(MuiBox)`
  margin-left: 5px;
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 18px;
  padding: 2px 10px;
  margin-bottom: 5px;
`;

const SUserWrap = styled(MuiBox)`
  display: flex;
  max-width: 400px;
  flex-wrap: wrap;
`;

const SAvatar = styled(Avatar)`
  height: 18px;
  width: 18px;
  margin-right: 5px;
`;

export {
  SDetailItem,
  SDetailItemInfo,
  SActionsWrap,
  SUser,
  SUserWrap,
  SAvatar,
};
