import { mxObjectCodec } from 'mxgraph-js';

class jsonCodec extends mxObjectCodec {
  decode(model) {
    return (
      model &&
      Object.keys(model.cells)
        .map((cell) => {
          const currentCell = model.getCell(cell);
          if (
            currentCell.style === undefined &&
            currentCell.value === undefined
          )
            return null;

          return {
            id: currentCell.id,
            vertex: currentCell.vertex,
            edge: currentCell.edge,
            connectable: currentCell.connectable,
            geometry: {
              x: currentCell.geometry.x,
              y: currentCell.geometry.y,
              width: currentCell.geometry.width,
              height: currentCell.geometry.height,
              relative: currentCell.geometry.relative,
            },
            value: currentCell.value,
            // children: currentCell.children, //TODO check
            source: currentCell.source,
            target: currentCell.target,
            parentId: currentCell.parent.id,
          };
        })
        .filter((item) => item !== null)
    );
  }
}

export default jsonCodec;
