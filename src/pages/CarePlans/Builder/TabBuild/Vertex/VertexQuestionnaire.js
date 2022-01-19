import React from 'react';
import Box from '@material-ui/core/Box';

import { Icon, Typography } from 'components/ui';
import { ThemeProvider } from 'lib/providers';
import { SBlock } from '../styled/vertexText';
import { useTranslation } from 'react-i18next';

import { vertexTypesData } from 'lib/enums/vertexTypes';
import { vertexTypes } from 'lib/enums/vertexTypes';

function VertexQuestionnaire(props) {
  const { value, title, geometry } = props;
  const color = title?.color || null;
  const { t } = useTranslation();

  return (
    <div style={{ position: 'relative' }}>
      <SBlock p={2} geometry={geometry}>
        <Typography
          variant="h5"
          style={{
            color:
              !!vertexTypesData[value.type] &&
              vertexTypesData[value.type].color,
          }}
          gutterBottom
        >
          <Icon
            icon={
              !!vertexTypesData[value.type] && vertexTypesData[value.type].icon
            }
            size="1x"
            mr={10}
          />
          {!!vertexTypesData[value.type] && vertexTypesData[value.type].text}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {value.questionnaire}
        </Typography>
      </SBlock>
    </div>
  );
}

export default VertexQuestionnaire;
