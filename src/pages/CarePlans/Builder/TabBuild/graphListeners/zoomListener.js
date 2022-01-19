import { mxEvent } from 'mxgraph-js';

const maxZoom = 2;
const minZoom = 0.5;

//TODO should be optimised
function zoomListener(graph, containerRef) {
  mxEvent.addMouseWheelListener((evt, up) => {
    const view = graph.view;
    const scale = view.getScale();

    if ((up && scale > maxZoom) || (!up && scale < minZoom)) {
      return;
    }

    const gridEnabled = graph.gridEnabled;
    graph.gridEnabled = false;
    const beforeZoom = graph.getPointForEvent(evt, false);

    if (up) {
      graph.zoomIn();
    } else {
      graph.zoomOut();
    }

    const afterZoom = graph.getPointForEvent(evt, false);
    const deltaX = afterZoom.x - beforeZoom.x;
    const deltaY = afterZoom.y - beforeZoom.y;

    view.setTranslate(view.translate.x + deltaX, view.translate.y + deltaY);

    graph.gridEnabled = gridEnabled;
  }, containerRef);
}

export default zoomListener;
