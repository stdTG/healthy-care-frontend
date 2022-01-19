import React, { useCallback } from 'react';
import { actions } from 'services/widget';
import { useDispatch } from 'react-redux';

const mappingInfo = [
  {
    top: 0,
    left: 0,
    transform: 'translate(-50%, -50%)',
    cursor: 'nw-resize',
    signX: -1,
    signY: -1,
  },
  {
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'n-resize',
    signX: 0,
    signY: -1,
  },
  {
    top: 0,
    right: 0,
    transform: 'translate(50%, -50%)',
    cursor: 'ne-resize',
    signX: 1,
    signY: -1,
  },
  {
    top: '50%',
    right: 0,
    transform: 'translate(50%, -50%)',
    cursor: 'ew-resize',
    signX: 1,
    signY: 0,
  },
  {
    bottom: 0,
    right: 0,
    transform: 'translate(50%, 50%)',
    cursor: 'se-resize',
    signX: 1,
    signY: 1,
  },
  {
    bottom: 0,
    right: '50%',
    transform: 'translate(50%, 50%)',
    cursor: 's-resize',
    signX: 0,
    signY: 1,
  },
  {
    bottom: 0,
    left: 0,
    transform: 'translate(-50%, 50%)',
    cursor: 'sw-resize',
    signX: -1,
    signY: 1,
  },
  {
    top: '50%',
    left: 0,
    transform: 'translate(-50%, -50%)',
    cursor: 'ew-resize',
    signX: -1,
    signY: 0,
  },
];

let orgX;
let orgY;
let orgGeometry;
let resizerIndex = undefined;

const Resizer = ({ value }) => {
  const dispatch = useDispatch();

  const handleMouseMove = useCallback(
    (e) => {
      if (resizerIndex === undefined) return;
      const validate = validateResizerEvent(e.pageX, e.pageY, resizerIndex);

      if (!validate) return;

      const geometry = { ...orgGeometry };
      const offsetX = e.pageX - orgX;
      const offsetY = e.pageY - orgY;

      if (mappingInfo[resizerIndex].signX === -1) {
        geometry.x = orgGeometry.x + offsetX;
      }
      if (mappingInfo[resizerIndex].signY === -1) {
        geometry.y = orgGeometry.y + offsetY;
      }

      geometry.width =
        orgGeometry.width + offsetX * mappingInfo[resizerIndex].signX;
      geometry.height =
        orgGeometry.height + offsetY * mappingInfo[resizerIndex].signY;

      dispatch(
        actions.saveWidget({
          id: value.id,
          geometry,
        })
      );
    },
    [dispatch, value]
  );

  const handleMouseUp = useCallback(
    (e) => {
      resizerIndex = undefined;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    },
    [handleMouseMove]
  );

  const handleMouseDown = useCallback(
    (e, index) => {
      orgX = e.pageX;
      orgY = e.pageY;
      resizerIndex = index;
      orgGeometry = { ...value.geometry };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [value, handleMouseUp, handleMouseMove]
  );

  const validateResizerEvent = (newX, newY, resizerIndex) => {
    if (resizerIndex === 0 || resizerIndex === 4) {
      return (newX - orgX) * (newY - orgY) >= 0;
    }
    if (resizerIndex === 2 || resizerIndex === 6) {
      return (newX - orgX) * (newY - orgY) <= 0;
    }
    return true;
  };

  return (
    <div>
      {mappingInfo.map((item, index) => (
        <div
          key={index}
          style={{
            ...item,
            width: 6,
            height: 6,
            background: '#00ff00',
            position: 'absolute',
            border: '.5px solid black',
            zIndex: 1,
          }}
          onMouseDown={(e) => handleMouseDown(e, index)}
        />
      ))}
    </div>
  );
};

export default Resizer;
