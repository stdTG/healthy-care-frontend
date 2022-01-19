import React, { useEffect } from 'react';

import { vertexTypes } from 'lib/enums/vertexTypes';
import EditAction from './EditAction';
import EditQuickReply from './EditQuickReply';
import EditQuestion from './EditQuestion';
import EditText from './EditText';
import EditContainer from './EditContainer';
import EditCondition from './EditCondition';
import PopoverSettings from './PopoverSettings';
import useDialog from 'lib/hooks/useDialog';
import DraggableDialog from '../../../../../components/Dialogs/DraggableDialog';
import EditCalculator from './EditCalculator';

const popoverIndent = 20;

function EditVertexPopover(props) {
  const {
    id,
    graph,
    close,
    anchorEl,
    isOpen,
    initialData,
    onNew,
    top,
    left,
  } = props;
  const settingsPopover = useDialog();

  if (!initialData || !isOpen) return null;

  const getVertex = () => {
    switch (initialData.type) {
      case vertexTypes.text:
        return <EditText initialValues={initialData.value} onSave={onSave} />;
      case vertexTypes.quickReply:
        return (
          <EditQuickReply initialData={initialData.value} onSave={onSave} />
        );
      case vertexTypes.question:
        return (
          <EditQuestion
            graph={graph}
            initialValues={initialData.value}
            onSave={onSave}
            settingsPopover={settingsPopover}
          />
        );
      case vertexTypes.action:
        return <EditAction initialValues={initialData.value} onSave={onSave} />;
      case vertexTypes.container:
        return (
          <EditContainer
            onSave={onSave}
            initialValues={initialData.value}
            settingsPopover={settingsPopover}
          />
        );
      case vertexTypes.calculator:
        return (
          <EditCalculator initialValues={initialData.value} onSave={onSave} />
        );
      case vertexTypes.condition:
        return (
          <EditCondition initialValues={initialData.value} onSave={onSave} />
        );
      default:
        return <EditText initialValues={initialData.value} onSave={onSave} />;
    }
  };

  const onSave = (values) => {
    close({
      vertex: { ...values, onNew, width: values.width, height: values.height },
    });
  };

  return (
    <div>
      <DraggableDialog
        // anchorEl={drag}
        // transformOrigin={{
        //   vertical: 'center',
        //   horizontal: 'left',
        // }}
        // anchorOrigin={{
        //   vertical: left,
        //   horizontal: top,
        // }}
        id={id}
        isOpen={isOpen}
        onClose={close}
      >
        {getVertex()}
        {settingsPopover.isOpen && (
          <PopoverSettings
            close={settingsPopover.close}
            isOpen={settingsPopover.isOpen}
            initialData={settingsPopover.initialData}
          />
        )}
      </DraggableDialog>
    </div>
  );
}

export default EditVertexPopover;
