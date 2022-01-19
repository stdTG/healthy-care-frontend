import { mxKeyHandler } from 'mxgraph-js';

const deleteKey = 46;
function removeElementListener(graph) {
  const keyHandler = new mxKeyHandler(graph);

  keyHandler.bindKey(deleteKey, function (evt) {
    if (graph.isEnabled()) {
      const currentNode = graph.getSelectionCell();
      graph.removeCells([currentNode]);
    }
  });
}

export default removeElementListener;
