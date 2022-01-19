import React, { useEffect } from 'react';
import shortid from 'shortid';
import {
  mxCellOverlay,
  mxConstants,
  mxEvent,
  mxImage,
  mxPoint,
  mxUtils,
  mxPrintPreview,
  mxGuide,
} from 'mxgraph-js';

import { editVertex } from '../graphListeners/editVertexListener';
import { vertexTypes } from 'lib/enums/vertexTypes';
import plusSvg from '../../../../../lib/icons/plus-circle.svg';

/**
 * Subscribe to click on the +Icon (create new vertex)
 * @params {graph, vertex, selectVertexDialog, editVertexPopover}
 * @isFirstRender is it the first render of existing scheme
 */
export default function addVertexListener(params, isFirstRender) {
  const {
    graph,
    vertex,
    selectVertexDialog,
    editVertexPopover,
    vertexes,
  } = params;

  if (vertexes) {
    vertexes.forEach((vertex) => {
      addOverlay(graph, vertex, selectVertexDialog, editVertexPopover);
    });
    return;
  }

  addOverlay(graph, vertex, selectVertexDialog, editVertexPopover);
}

const addOverlay = (graph, vertex, selectVertexDialog, editVertexPopover) => {
  const overlay = new mxCellOverlay(new mxImage(plusSvg, 16, 16));

  overlay.cursor = 'pointer';
  overlay.align = mxConstants.ALIGN_CENTER;
  overlay.offset = new mxPoint(0, 5);

  overlay.addListener(
    mxEvent.CLICK,
    mxUtils.bind(this, async function () {
      // todo: если у парента создаваемого вертекса уже есть стрелка,
      // начало которой является этим парентом, значит у него уже
      // есть чилдрены. Значит чилдрен создавать НЕЛЬЗЯ.

      if (vertex.edges?.some((edge) => edge.source.id === vertex.id)) {
        graph.removeCellOverlay(vertex, overlay);
        return;
      }

      const newItem = await selectVertexDialog.open();

      if (newItem && newItem.data) {
        addVertex({
          graph,
          vertex,
          type: newItem.data.type,
          selectVertexDialog,
          editVertexPopover,
          overlay,
        });
      }
    })
  );

  graph.addCellOverlay(vertex, overlay);
};

export const addVertex = (params) => {
  const {
    graph,
    vertex: cell,
    type,
    selectVertexDialog,
    editVertexPopover,
    overlay,
  } = params;

  //panning graph when we add new cell
  const cells = graph.getChildCells().filter((cell) => cell.vertex);
  const defaultParent = graph.getDefaultParent();

  graph?.moveCells(graph.getChildCells(null, true, true), 0, -150);

  const parent = defaultParent;

  const model = graph.getModel();

  let vertex;

  model.beginUpdate();

  if (type === vertexTypes.container) {
    vertex = addContainerVertex({
      graph,
      model,
      selectVertexDialog,
      editVertexPopover,
      type,
      cell,
      parent,
    });

    return vertex;
  } else {
    try {
      vertex = graph.insertVertex(...getVertexData(parent, type, cell));
      if (cell.parent.id !== '1') {
        updateContainerSize(model, cell);
      }

      graph.insertEdge(parent, null, '', cell, vertex);

      //Todo для того чтобы убрать "плюс" на виджете, который больше не может иметь чайлдов
      if (cell.edges?.some((edge) => edge.source.id === cell.id)) {
        graph.removeCellOverlay(cell, overlay);
      }

      addVertexListener({
        graph,
        vertex,
        selectVertexDialog,
        editVertexPopover,
      });
    } finally {
      model.endUpdate();
    }
  }

  //open edit popup right after creation
  editVertex({
    graph,
    children: [],
    cell: vertex,
    editVertexPopover,
    selectVertexDialog,
    overlay,
  });

  return vertex;
};

const getVertexData = (defaultParent, type, prevCell) => {
  const id = shortid.generate();
  const height = 80;
  const width = 220;

  return [
    prevCell.parent,
    id,
    {
      id,
      text: null,
      type,
      parentId: prevCell.parent.id || defaultParent.id,
    },
    prevCell.geometry.x,
    prevCell.geometry.y + prevCell.geometry.height + 50,
    width,
    height,
  ];
};

const addContainerVertex = ({
  graph,
  model,
  type,
  selectVertexDialog,
  editVertexPopover,
  cell,
  parent,
  overlay,
}) => {
  let vertex;
  try {
    const id = shortid.generate();

    const height = 200;
    const width = 250;
    vertex = graph.insertVertex(
      cell.parent,
      id,
      { type, id },
      cell.geometry.x,
      cell.geometry.y + cell.geometry.height + 50,
      width,
      height
    );
    graph.insertEdge(parent, null, '', cell, vertex);

    //Todo для того чтобы убрать "плюс" на виджете, который больше не может иметь чайлдов
    if (cell.edges?.some((edge) => edge.source.id === cell.id)) {
      graph.removeCellOverlay(cell, overlay);
    }

    addVertexListener(
      {
        graph,
        vertex,
        selectVertexDialog,
        editVertexPopover,
      },
      true
    );
  } finally {
    model.endUpdate();
  }
  return vertex;
};

const updateContainerSize = (model, cell) => {
  const geometry = model.getGeometry(cell.parent);
  let height = cell.parent.geometry.height;
  let width = cell.parent.geometry.width;

  cell.parent.children.forEach((item) => {
    let tempHeight = item.geometry.y + item.geometry.height + 30;
    if (height < tempHeight) {
      height = tempHeight;
    }

    const tempWidth = item.geometry.x + item.geometry.width + 20;
    if (tempWidth > width) {
      width = tempWidth;
    }
  });

  geometry.height = height + 20;
  geometry.width = width;
  model.setGeometry(cell.parent, geometry);
};
