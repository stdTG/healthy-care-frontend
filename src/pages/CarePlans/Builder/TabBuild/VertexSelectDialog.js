import React from 'react';
import { Button as MuiButton } from '@material-ui/core';

import { vertexTypes, vertexTypesData } from 'lib/enums/vertexTypes';
import Dialog from 'components/Dialogs';
import { Icon, Typography } from 'components/ui';
import { Title } from 'pages/CarePlans/Builder/TabBuild/styled/addVertexDialog';
import { useTranslation } from 'react-i18next';

function VertexSelectDialog(props) {
  const { close, isInsideContainer } = props;
  const { t } = useTranslation();

  const vertexes = {
    content: [
      vertexTypesData[vertexTypes.text],
      // vertexTypesData[vertexTypes.libraryContent],
      // vertexTypesData[vertexTypes.map],
      vertexTypesData[vertexTypes.data],
      vertexTypesData[vertexTypes.questionnaire],
      vertexTypesData[vertexTypes.question],
      !isInsideContainer && vertexTypesData[vertexTypes.container],
      vertexTypesData[vertexTypes.action],
      vertexTypesData[vertexTypes.calculator],
    ],
    input: [
      vertexTypesData[vertexTypes.quickReply],
      vertexTypesData[vertexTypes.textInput],
      vertexTypesData[vertexTypes.choices],
    ],
    action: [
      vertexTypesData[vertexTypes.message],
      vertexTypesData[vertexTypes.appointment],
      // vertexTypesData[vertexTypes.arrow],
    ],
  };

  const Vertex = ({ type, text, color, icon }) => (
    <MuiButton
      variant="outlined"
      style={{ margin: '10px 10px 10px 0', fontWeight: '500' }}
      onClick={() => close({ data: { type } })}
    >
      <div style={{ minWidth: '126px' }}>
        <Icon icon={icon} size="1x" style={{ color }} />
        <Typography display="block">{text}</Typography>
      </div>
    </MuiButton>
  );

  return (
    <Dialog onClose={close} title={t('Add widget')} {...props}>
      <section>
        <Title text={t('Content')} />
        {vertexes.content.map(
          (item) => item && <Vertex key={item.type} {...item} />
        )}
      </section>

      <section>
        <Title text="Input" />
        {vertexes.input.map((item) => (
          <Vertex key={item.type} {...item} />
        ))}
      </section>

      <section>
        <Title text={t('Action')} />
        {vertexes.action.map((item) => (
          <Vertex key={item.type} {...item} />
        ))}
      </section>
    </Dialog>
  );
}

export default VertexSelectDialog;
