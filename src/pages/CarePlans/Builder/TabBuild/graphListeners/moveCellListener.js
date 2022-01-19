import { mxEvent } from 'mxgraph-js';

function moveCellListener() {
  mxEvent.removeCellsFromParent();
}

export default moveCellListener;
