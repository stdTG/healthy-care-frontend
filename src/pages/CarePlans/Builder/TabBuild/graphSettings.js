import React from 'react';
import { filter, forEach, map } from 'ramda';
import {
  mxConnectionConstraint,
  mxConstraintHandler,
  mxConnectionHandler,
  mxGraphHandler,
  mxEdgeHandler,
  mxPerimeter,
  mxConstants,
  mxCellState,
  mxEdgeStyle,
  mxEvent,
  mxGuide,
  mxImage,
  mxUtils,
  mxPoint,
} from 'mxgraph-js';

import { vertexTypes } from 'lib/enums/vertexTypes';
import Vertex from './Vertex';
import addVertexListener from '../TabBuild/graphListeners/addVertexListener';

//TODO refactor move to utils, split into modulus
export const setVertexStyle = (graph, addVertexToContainer) => {
  const style = {};
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
  style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;

  graph.getStylesheet().putDefaultVertexStyle(style);
  graph.convertValueToString = Vertex(addVertexToContainer);
};

export const setEdgeStyle = (graph) => {
  const style = {};
  style[mxConstants.STYLE_STROKECOLOR] = '#2164E8';
  style[mxConstants.STYLE_STROKEWIDTH] = '2';
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
  style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
  style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_OPEN_THIN;
  style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_OVAL;
  style[mxConstants.STYLE_FONTSIZE] = '10';
  style[mxConstants.VALID_COLOR] = '#27bf81';

  graph.getStylesheet().putDefaultEdgeStyle(style);
};

export const setGraphSetting = (graph) => {
  mxGraphHandler.prototype.removeCellsFromParent = false;
  mxGraphHandler.prototype.guidesEnabled = true;
  mxGuide.prototype.isEnabledForEvent = function (evt) {
    return !mxEvent.isAltDown(evt);
  };

  mxEdgeHandler.prototype.snapToTerminals = true;
  mxConstraintHandler.prototype.pointImage = new mxImage('./times.svg', 5, 7.5);

  graph.gridSize = 10;
  graph.setPanning(true);
  graph.setTooltips(true);
  graph.setConnectable(true);
  graph.setCellsEditable(true);
  graph.setEnabled(true);
  graph.setAllowDanglingEdges(false);
  graph.setDisconnectOnMove(false);
  graph.panningHandler.useLeftButtonForPanning = true;
  // Enables HTML labels
  graph.setHtmlLabels(true);

  graph.centerZoom = true;
  graph.autoSizeCellsOnAdd = true;
};

//TODO refactoring is required
export const setPopup = (
  graph,
  setGraphData,
  selectVertexDialog,
  editVertexPopover
) => {
  graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
    if (!cell) {
      return;
    }

    if (cell.edge === true) {
      menu.addItem('Delete connection', null, function () {
        graph.removeCells([cell]);
        mxEvent.consume(evt);
      });
    } else {
      menu.addItem('Edit child node', null, function () {
        // mxUtils.alert('Edit child node: ');
        // selectionChanged(graph)
      });
      menu.addItem('Delete child node', null, function () {
        const cells = graph.getChildCells().filter((cell) => cell.vertex);
        const edges = graph.getChildCells().filter((cell) => cell.edge);

        const edgesFromCurrentCell = edges.filter(
          (edge) => edge.target.id === cell.id
        );
        const parentCells = edgesFromCurrentCell.map((edge) => {
          return edge.source;
        });

        const currentCell = cells.find((cell_) => cell_.id === cell.id);

        if (cells.length === 1) {
          setGraphData({});
          return;
        }

        //TODO example how to remove children for 'Quick reply'
        if (cell.value.type === vertexTypes.quickReply) {
          const children = map(
            (item) => item.target,
            filter((item) => item.target.id !== cell.id, cell.edges)
          );
          graph.removeCells([cell, ...children]);
        } else {
          graph.removeCells([cell]);
          addVertexListener({
            graph,
            selectVertexDialog,
            editVertexPopover,
            vertexes: parentCells,
          });
        }
        mxEvent.consume(evt);
      });
    }
  };
};

//TODO check functionality, refactor
export const setConnections = (graph) => {
  mxConstraintHandler.prototype.intersects = function (
    icon,
    point,
    source,
    existingEdge
  ) {
    return !source || existingEdge || mxUtils.intersects(icon.bounds, point);
  };

  const updateEdgeState = mxConnectionHandler.prototype.updateEdgeState;

  mxConnectionHandler.prototype.updateEdgeState = function (pt, constraint) {
    if (pt != null && this.previous != null) {
      const constraints = this.graph.getAllConnectionConstraints(this.previous);
      let nearestConstraint = null;
      let dist = null;

      forEach((item) => {
        const cp = this.graph.getConnectionPoint(this.previous, item);

        if (cp != null) {
          const tmp =
            (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);

          if (dist == null || tmp < dist) {
            nearestConstraint = item;
            dist = tmp;
          }
        }
      }, constraints);

      if (nearestConstraint != null) {
        this.sourceConstraint = nearestConstraint;
      }
    }

    updateEdgeState.apply(this, arguments);
  };

  if (graph.connectionHandler.connectImage == null) {
    graph.connectionHandler.isConnectableCell = function (cell) {
      return false;
    };
    mxEdgeHandler.prototype.isConnectableCell = function (cell) {
      return graph.connectionHandler.isConnectableCell(cell);
    };
  }

  graph.getAllConnectionConstraints = function (terminal) {
    if (terminal != null && this.model.isVertex(terminal.cell)) {
      return [
        // new mxConnectionConstraint(new mxPoint(0.5, 0), true, 'left'),
        new mxConnectionConstraint(new mxPoint(0.5, -1), true, 'top'),
        new mxConnectionConstraint(new mxPoint(0.5, 1), true, 'bottom'),
        // new mxConnectionConstraint(new mxPoint(1, 0.5), true, 'right'),
      ];
    }
    return null;
  };

  // Connect preview
  graph.connectionHandler.createEdgeState = function (me) {
    const edge = graph.createEdge();

    return new mxCellState(
      this.graph.view,
      edge,
      this.graph.getCellStyle(edge)
    );
  };
};
