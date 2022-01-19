import React, { useEffect, useState, useRef } from 'react';
import { mxRubberband, mxGraph, mxClient, mxUtils, mxEvent } from 'mxgraph-js';

import {
  setGraphSetting,
  setConnections,
  setVertexStyle,
  setEdgeStyle,
  setPopup,
} from './graphSettings';
import removeElementListener from './graphListeners/removeElementListener';
import editVertexListener from './graphListeners/editVertexListener';
import addVertexListener from './graphListeners/addVertexListener';
import GraphToolbar from './GraphToolbar';
import { SContainer } from './styled/graph';
import './styled/mxgraph.css';

function Graph(props) {
  const {
    data,
    graph,
    setGraph,
    editVertexPopover,
    onSave,
    selectVertexDialog,
    isFirstRender,
    setGraphData,
  } = props;

  // const [graph, setGraph] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    loadGraph();
  }, []);

  useEffect(() => {
    if (!graph) return;

    setPopup(graph, setGraphData, selectVertexDialog, editVertexPopover);
    setEdgeStyle(graph);
    setConnections(graph);
    setVertexStyle(graph, addVertexToContainer);
    setGraphSetting(graph);
    // zoomListener(graph, containerRef.current);
    editVertexListener({ graph, editVertexPopover, selectVertexDialog });
    removeElementListener(graph);
    new mxRubberband(graph);
  }, [graph]);

  useEffect(() => {
    if (!graph) return;

    const model = graph.getModel();
    model.clear();
    if (data !== undefined) {
      initGraph();
    }
  }, [data]);

  const addVertexToContainer = (node) => {
    const model = graph.getModel();
    const container = model.getCell(node.parentId);

    const vertex = graph.insertVertex(
      container,
      node.id,
      node.value,
      node.geometry.x,
      node.geometry.y,
      node.geometry.width,
      node.geometry.height,
      null
    );

    addVertexListener({
      graph,
      vertex,
      selectVertexDialog,
      editVertexPopover,
    });
  };

  const initGraph = () => {
    const parent = graph.getDefaultParent();
    const model = graph.getModel();
    let vertices = {};
    let edges = [];

    model.beginUpdate();

    try {
      //first we need to set all vertexes then connect them by edges
      (data?.graph || data)?.forEach((node) => {
        if (node.vertex === true) {
          let nodeParent;
          if (node.parentId?.length > 1) {
            nodeParent = graph
              .getChildCells()
              .filter((vertex) => vertex.id === node.parentId)?.[0];
          }

          vertices[node.id] = graph.insertVertex(
            nodeParent || parent,
            node.id,
            node.value,
            node.geometry.x,
            node.geometry.y,
            node.geometry.width,
            node.geometry.height,
            null
          );

          //listen if we need to add a new vertex from the existing one
          addVertexListener(
            {
              graph,
              vertex: vertices[node.id],
              selectVertexDialog,
              editVertexPopover,
              isFirstRender,
            },
            isFirstRender
          );
        } else {
          edges.push(node);
        }
      });

      edges.forEach((edge) => {
        graph.insertEdge(
          parent,
          null,
          '',
          vertices[edge.source],
          vertices[edge.target]
        );
      });
    } finally {
      model.endUpdate();
    }

    // try {
    //   //first we need to set all vertexes then connect them by edges
    //   data?.forEach((node) => {
    //     if (node.vertex === true) {
    //       if (node.parentId !== '1') {
    //         const model = graph.getModel();
    //         const container = model.getCell(node.parentId);
    //
    //         vertices[node.id] = graph.insertVertex(
    //           container,
    //           node.id,
    //           node.value,
    //           node.geometry.x,
    //           node.geometry.y,
    //           node.geometry.width,
    //           node.geometry.height,
    //           null
    //         );
    //       } else {
    //         vertices[node.id] = graph.insertVertex(
    //           parent,
    //           node.id,
    //           node.value,
    //           node.geometry.x,
    //           node.geometry.y,
    //           node.geometry.width,
    //           node.geometry.height,
    //           null
    //         );
    //       }
    //
    //       //listen if we need to add a new vertex from the existing one
    //       addVertexListener(
    //         {
    //           graph,
    //           vertex: vertices[node.id],
    //           selectVertexDialog,
    //           editVertexPopover,
    //           isFirstRender,
    //         },
    //         isFirstRender
    //       );
    //     } else {
    //       edges.push(node);
    //     }
    //   });
    //
    //   edges.forEach((edge) => {
    //     graph.insertEdge(
    //       parent,
    //       null,
    //       '',
    //       vertices[edge.source],
    //       vertices[edge.target]
    //     );
    //   });
    // } finally {
    //   model.endUpdate();
    // }
  };

  const loadGraph = () => {
    if (!mxClient.isBrowserSupported()) {
      mxUtils.error('Browser is not supported!', 200, false);
      return;
    }

    const newGraph = new mxGraph(containerRef.current);
    newGraph.createPanningHandler();
    newGraph.createConnectionHandler();
    newGraph.center(true, true);
    setGraph(newGraph);
    mxEvent.disableContextMenu(containerRef.current);
  };

  return (
    <>
      <div style={{ height: '80vh' }}>
        <SContainer ref={containerRef} />
      </div>
      <GraphToolbar graph={graph} onSave={onSave} data={data} />
    </>
  );
}

export default Graph;
