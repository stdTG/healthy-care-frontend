import React from 'react';

import { Icon, Typography } from 'components/ui';
import { ThemeProvider } from 'lib/providers';
import { SBlock } from '../styled/vertexText';
import { useTranslation } from 'react-i18next';

function VertexText(props) {
  const { value, title, geometry } = props;
  const color = title?.color || null;
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <div style={{ position: 'relative' }}>
        <SBlock p={2} geometry={geometry}>
          <Typography variant="h5" style={{ color }} gutterBottom>
            <Icon icon={title?.icon} size="1x" mr={10} />
            {title?.text}
          </Typography>

          <Typography variant="subtitle1">
            {value.text || t('Double click to edit')}
          </Typography>
        </SBlock>
      </div>
    </ThemeProvider>
  );
}

export default VertexText;
