import { any } from 'ramda';

function getHasChildren(cell) {
  return (
    cell.edges &&
    any((item) => {
      return item.edge && item.source.id === cell.id;
    }, cell.edges)
  );
}

export default getHasChildren;
