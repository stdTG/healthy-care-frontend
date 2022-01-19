import React, { useCallback, useState } from 'react';
import { getMarkerEnd } from 'react-flow-renderer';
import EdgeContextMenu from '../EdgeContextMenu';

const Edge = (props) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style = {},
    arrowHeadType,
    markerEndId,
    selected,
  } = props;

  const [edgeContextState, setEdgeContextState] = useState({
    isOpen: false,
    posX: null,
    posY: null,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  const onEdgeContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setEdgeContextState({
        isOpen: true,
        posX: event.clientX,
        posY: event.clientY,
      });
    },
    [setEdgeContextState]
  );

  return (
    <>
      <path
        id={id}
        style={{ ...style, zIndex: 11 }}
        className="react-flow__edge-path"
        d={`M ${sourceX} ${sourceY} l 0 ${(targetY - sourceY) / 2} l ${
          targetX - sourceX
        } 0 l 0 ${(targetY - sourceY) / 2 - 2}`}
        markerEnd={markerEnd}
        onContextMenu={onEdgeContextMenu}
      />
      {selected && (
        <>
          <path
            id={id}
            d={`M ${sourceX} ${sourceY} l 0 ${(targetY - sourceY) / 2} l ${
              targetX - sourceX
            } 0 l 0 ${(targetY - sourceY) / 2}`}
            markerEnd={markerEnd}
            strokeWidth="1"
            stroke="#ffffff"
            fill="none"
            strokeDasharray="2,5"
          />
          <rect
            x={(sourceX + targetX) / 2 - 3}
            y={(sourceY + targetY) / 2 - 3}
            width="6"
            height="6"
            strokeWidth="1"
            stroke="#000000"
            fill="#3cfe3e"
          />
        </>
      )}
      <EdgeContextMenu
        {...edgeContextState}
        edge={props}
        onClose={() =>
          setEdgeContextState({ isOpen: false, posX: null, posY: null })
        }
      />
    </>
  );
};

export default Edge;
