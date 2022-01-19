import React from 'react';
import EditText from 'pages/CarePlans/Builder/TabBuild/VertexEditPopover/EditText';
import EditQuickReply from 'pages/CarePlans/Builder/TabBuild/VertexEditPopover/EditQuickReply';
import EditQuestion from 'pages/CarePlans/Builder/TabBuild/VertexEditPopover/EditQuestion';
import EditAction from 'pages/CarePlans/Builder/TabBuild/VertexEditPopover/EditAction';
import EditContainer from 'pages/CarePlans/Builder/TabBuild/VertexEditPopover/EditContainer';
import EditQuestionnaire from 'pages/CarePlans/Builder/TabBuild/VertexEditPopover/EditQuestionnaire';
import EditCalculator from 'pages/CarePlans/Builder/TabBuild/VertexEditPopover/EditCalculator';
import { vertexTypes } from 'lib/enums/vertexTypes';
import Dialog from '@material-ui/core/Dialog';
import EditCondition from 'pages/CarePlans/Builder/TabBuild/VertexEditPopover/EditCondition';

const WidgetEditModal = ({ widget, isOpen, onClose, onSaveWidget }) => {
  const onSave = (values) => {
    onSaveWidget(widget.id, values);
    onClose();
  };

  const getVertex = () => {
    switch (widget?.type) {
      case vertexTypes.text:
        return <EditText initialValues={widget.value} onSave={onSave} />;
      case vertexTypes.quickReply:
        return <EditQuickReply initialData={widget.value} onSave={onSave} />;
      case vertexTypes.question:
        return (
          <EditQuestion
            graph={{}}
            initialValues={widget.value}
            onSave={onSave}
            settingsPopover={{}}
          />
        );
      case vertexTypes.action:
        return <EditAction initialValues={widget.value} onSave={onSave} />;
      case vertexTypes.container:
        return (
          <EditContainer
            onSave={onSave}
            initialValues={widget.value}
            settingsPopover={{}}
          />
        );
      case vertexTypes.calculator:
        return (
          <EditCalculator
            initialValues={{ ...widget.value, id: widget.id }}
            onSave={onSave}
          />
        );
      case vertexTypes.questionnaire:
        return (
          <EditQuestionnaire
            onSave={onSave}
            initialValues={widget.value}
            settingsPopover={{}}
          />
        );
      case vertexTypes.condition:
        return (
          <EditCondition
            initialValues={{ ...widget.value, id: widget.id }}
            onSave={onSave}
          />
        );
      default:
        return <EditText initialValues={widget.value} onSave={onSave} />;
    }
  };

  return (
    <Dialog id={widget?.id} open={isOpen} onClose={onClose}>
      {getVertex()}
    </Dialog>
  );
};

export default WidgetEditModal;
