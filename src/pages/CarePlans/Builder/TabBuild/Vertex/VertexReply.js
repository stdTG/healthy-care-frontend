import React from 'react';

import { Typography } from 'components/ui';
import { ThemeProvider } from 'lib/providers';
import { SBlock } from 'pages/CarePlans/Builder/TabBuild/styled/vertexReply';

function VertexReply(props) {
  const { value, geometry } = props;
  return (
    <ThemeProvider>
      <div style={{ position: 'relative' }}>
        <SBlock geometry={geometry}>
          <Typography variant="h5" style={{ whiteSpace: ' break-spaces' }}>
            {value.text}
          </Typography>
        </SBlock>
      </div>
    </ThemeProvider>
  );
}

export default VertexReply;
