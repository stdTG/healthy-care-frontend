import {
  addIndex,
  any,
  forEach,
  isNil,
  values,
  update,
  findIndex,
  mergeDeepRight,
} from 'ramda';

import addVertexListener from '../graphListeners/addVertexListener';
import getHasChildren from 'pages/CarePlans/Builder/TabBuild/utils/getHasChildren';

export default function editVertexListener(params) {
  const { graph, editVertexPopover, selectVertexDialog } = params;

  graph.dblClick = function (evt, cell) {
    const model = graph.getModel();
    let children = [];

    if (isNil(cell)) return;

    const vertexChildren =
      (cell.value.children && values(cell.value.children)) || [];

    if (vertexChildren.length !== 0) {
      const clearVertexChildren = vertexChildren.filter(
        (vertex) => vertex !== undefined
      );

      children = clearVertexChildren
        .map((reply) => model.getCell(reply.id))
        .filter(Boolean);
    }

    editVertex({
      graph,
      editVertexPopover,
      cell,
      children,
      selectVertexDialog,
    });
  };
}

//TODO Refactor Complex logic to add child vertexes
export const editVertex = async (params) => {
  const {
    graph,
    editVertexPopover,
    cell,
    children,
    selectVertexDialog,
  } = params;

  const model = graph.getModel();

  const isSource =
    children.length !== 0
      ? any(getHasChildren, children)
      : cell
      ? any(getHasChildren, [cell])
      : false;

  let x = cell.geometry.x + cell.geometry.width;
  let y = cell.geometry.y;

  if (cell.parent && cell.parent.id !== '1') {
    x = cell.parent.geometry.x + cell.geometry.x + cell.geometry.width;
    y = cell.parent.geometry.y + cell.geometry.y;
  }
  const { vertex } = await editVertexPopover.open({
    x,
    y,
    type: cell.value.type,
    value: {
      ...cell.value,
      id: cell.id,
      children:
        values(cell.value.children).filter((cell) => cell !== undefined) || [],
      isSource,
    },
  });

  if (!vertex) {
    return;
  }

  model.beginUpdate();
  try {
    if (vertex.width) {
      const geometry = model.getGeometry(cell);
      geometry.height = vertex.height;
      geometry.width = vertex.width;
      model.setGeometry(cell, geometry);
    }

    model.setValue(cell, { ...cell.value, ...vertex });
    const parentCell = model.getCell(cell.value.childParentId);
    if (cell.value.childParentId) {
      if (parentCell) {
        const childIndex = findIndex((item) => item.id === cell.id)(
          parentCell.value.children
        );
        const newValue = {
          ...parentCell.value,
          children: update(
            childIndex,
            mergeDeepRight(parentCell.value.children[childIndex], {
              value: cell.value,
            }),
            parentCell.value.children
          ),
        };
        model.setValue(parentCell, newValue);
      }
    }

    if (!vertex.isChildrenShown && vertex.children) {
      addIndex(forEach)((item, index) => {
        const childCell = model.getCell(item.id);
        if (childCell) {
          graph.removeCells([childCell]);
        }
      }, values(vertex.children));
    } else if (vertex.children) {
      const vertexes = vertex.children.filter((vertex) => vertex !== undefined);
      console.log(vertexes, '$!$!');
      addIndex(forEach)((item, index) => {
        const childCell = model.getCell(item?.id);

        if (!childCell) {
          const parent = graph.getDefaultParent();
          const childVertex = graph.insertVertex(
            cell.parent,
            item.id,
            {
              id: item.id,
              ...item.value,
              parentId: cell.id,
            },
            cell.geometry.x + vertex.width / 2 + item.offsetX,
            cell.geometry.y + vertex.height + item.offsetY,
            item.width,
            item.height
          );

          graph.insertEdge(parent, null, '', cell, childVertex);

          addVertexListener(
            {
              graph,
              vertex: childVertex,
              selectVertexDialog,
              editVertexPopover,
            },
            true
          );

          model.setValue(cell, {
            ...cell.value,
            children: cell.value?.children,
          });
        } else if (childCell) {
          model.setValue(childCell, item.value);
        }
      }, vertexes);
    }
  } finally {
    model.endUpdate();
  }
};
