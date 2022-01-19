import React from 'react';

import {
  SCard,
  SInfoWrap,
} from 'pages/CarePlans/Builder/TabBuild/styled/SCard';
import CardActions from './CardActions';
import { careTeamMemberRouteTemplates as routeTemplates } from 'routing/routeTemplates';
import { useHistory } from 'react-router-dom';
import useDialog from 'lib/hooks/useDialog';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { CarePlanType } from 'pages/CarePlans/constants';
import { Typography } from '@material-ui/core';

import { Chip, Icon } from 'components/ui';

const Card = (props) => {
  const { item } = props;
  const history = useHistory();
  const deleteDialog = useDialog();
  const moduleState = useSelector((state) => state.carePlans);

  const getRouteUrl = () => {
    if (moduleState.currentType == CarePlanType.Workspace) {
      return routeTemplates.carePlanWorkspace_One.replace(':id_', item.id_);
    }
    return routeTemplates.carePlanTemplate_One.replace(':id_', item.id_);
  };

  const view = () => {
    history.push(getRouteUrl());
  };
  const modify = () => {
    history.push(getRouteUrl());
  };
  const duplicate = () => {
    history.push(getRouteUrl());
  };
  const delete_ = () => {};

  const getFormattedTitle = (title) => {
    return title.length > 20 ? title.slice(0, 20) + '...' : title;
  };

  return (
    <SCard cursor="true">
      <CardActions
        onView={view}
        onModify={modify}
        onDuplicate={duplicate}
        onDelete={delete_}
      />
      <div onClick={view}>
        <SCardHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon icon={'file'} size={'lg'} mr={10} />
            <STitle>{getFormattedTitle(item.name)}</STitle>
          </div>
        </SCardHeader>
        <SCardDescription>
          <span>{item.description}</span>
        </SCardDescription>

        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <Chip color="secondary" label={item.status} />
        </div>
      </div>
    </SCard>
  );
};

export default Card;

const STitle = styled.div`
  font-size: 19px;
  font-weight: 600;
`;
const SCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const SCardDescription = styled.div`
  font-size: 17px;
  color: silver;
  line-height: 1.3;
  .MuiTypography-body1 {
    line-height: 1.3;
  }
`;
