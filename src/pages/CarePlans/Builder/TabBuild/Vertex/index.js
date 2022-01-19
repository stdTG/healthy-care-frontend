import React from 'react';
import ReactDom from 'react-dom';

import { vertexTypes, vertexTypesData } from 'lib/enums/vertexTypes';
import VertexContainer from './VertexContainer';
import VertexQuestion from './VertexQuestion';
import VertexAction from './VertexAction';
import VertexReply from './VertexReply';
import VertexText from './VertexText';

function Vertex(addVertexToContainer) {
  return function (cell) {
    const { value, geometry } = cell;

    if (value instanceof Object) {
      const title = vertexTypesData[value.type];
      const container = document.createElement('div');

      const getVertexView = (props) => {
        switch (value.type) {
          case vertexTypes.choices:
            return <VertexReply {...props} />;
          case vertexTypes.question:
            return <VertexQuestion {...props} />;
          case vertexTypes.action:
            return <VertexAction {...props} />;
          case vertexTypes.container:
            return (
              <VertexContainer {...props} addVertex={addVertexToContainer} />
            );
          case vertexTypes.calculator:
            return <VertexText {...props} />;
          default:
            return <VertexText {...props} />;
        }
      };

      ReactDom.render(
        getVertexView({ geometry, type: value.type, value, title, cell }),
        container
      );

      return container;
    }

    return value;
  };
}

export default Vertex;
