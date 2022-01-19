import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import { vertexTypes, vertexTypesData } from 'lib/enums/vertexTypes';
import { Icon } from 'components/ui';
import styled from 'styled-components';

const Vertex = ({ type, text, color, icon }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Tooltip title={text}>
      <MuiButton
        variant="outlined"
        style={{
          margin: '10px 10px 10px 0',
          fontWeight: '500',
          background: 'white',
        }}
        draggable
        onDragStart={(event) => onDragStart(event)}
      >
        <div>
          <Icon icon={icon} size="1x" style={{ color }} />
        </div>
      </MuiButton>
    </Tooltip>
  );
};

const Toolbar = () => {
  const vertexes = [
    vertexTypesData[vertexTypes.text],
    // vertexTypesData[vertexTypes.libraryContent],
    // vertexTypesData[vertexTypes.map],
    vertexTypesData[vertexTypes.data],
    vertexTypesData[vertexTypes.questionnaire],
    vertexTypesData[vertexTypes.question],
    vertexTypesData[vertexTypes.container],
    vertexTypesData[vertexTypes.action],
    vertexTypesData[vertexTypes.calculator],
    vertexTypesData[vertexTypes.condition],
    vertexTypesData[vertexTypes.quickReply],
    vertexTypesData[vertexTypes.textInput],
    vertexTypesData[vertexTypes.choices],
    vertexTypesData[vertexTypes.message],
    vertexTypesData[vertexTypes.appointment],
  ];

  return (
    <Wrapper>
      {vertexes.map((item) => item && <Vertex key={item.type} {...item} />)}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Toolbar;
