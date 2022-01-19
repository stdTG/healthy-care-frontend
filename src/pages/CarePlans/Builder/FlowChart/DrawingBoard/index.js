import React, {
  useEffect,
  useRef,
  useState,
  memo,
  useMemo,
  useCallback,
} from 'react';
import ReactFlow, {
  ArrowHeadType,
  Background,
  Controls,
} from 'react-flow-renderer';
import WidgetView from '../WidgetView';
import Edge from '../Edge';
import WidgetEditModal from '../WidgetEditModal';
import { actions, selectors } from 'services/widget';
import { useDispatch, useSelector } from 'react-redux';
import Export from '../Export';
import { vertexTypes } from 'lib/enums/vertexTypes';
import { questionTypes } from 'lib/enums/questionTypes';

const DrawingBoard = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const widgets = useSelector(selectors.getWidgets);
  const currentWidget = useSelector(selectors.getCurrentWidget);
  const maxId = useSelector(selectors.getMaxId);
  const dispatch = useDispatch();
  const screenHeight = window.innerHeight;

  // useEffect(() => {
  //   try {
  //     const widgetData = localStorage.getItem('alakine_widgets');
  //     dispatch(
  //       actions.saveWidgets({
  //         ...JSON.parse(widgetData),
  //       })
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [dispatch]);

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    if (!reactFlowWrapper.current) return;

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const geometry = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    setIsOpen(true);

    dispatch(
      actions.addWidget({
        geometry: {
          ...geometry,
          width: type === vertexTypes.container ? 220 : 180,
          height: type === vertexTypes.container ? 200 : 60,
        },
        type,
        value: {
          type,
          text: '',
        },
      })
    );
  };

  const onElementsRemove = (elementsToRemove) => {
    dispatch(actions.removeWidgetOrAssociation(elementsToRemove[0]));
  };

  const mapToElements = useCallback((widgets) => {
    const elements = [];
    widgets.forEach((widget) => {
      if (widget.edge) {
        elements.push(widget);
        return;
      }
      if (widget.vertex && widget.geometry?.relative) {
        const parent = widgets.find((w) => w.id === widget.parentId);
        elements.push({
          id: widget.id,
          type: 'special',
          data: {
            ...widget,
            type: widget.type,
            ...widget.value,
          },
          position: {
            ...widget.geometry,
            x: parent?.geometry?.x + widget.geometry.x,
            y: parent?.geometry?.y + widget.geometry.y,
          },
          arrowHeadType: ArrowHeadType.ArrowClosed,
        });
      } else {
        elements.push({
          id: widget.id,
          type: 'special',
          position: widget.geometry,
          data: {
            ...widget,
            type: widget.type,
            ...widget.value,
          },
          arrowHeadType: ArrowHeadType.ArrowClosed,
        });

        if (
          (widget.type === vertexTypes?.question &&
            widget.value.questionType === questionTypes.multipleChoice &&
            widget.value.isChildrenShown) ||
          (widget.type === vertexTypes.condition && widget.value.children)
        ) {
          widget.value.children.forEach((item) => {
            elements.push({
              id: item.id,
              type: 'special',
              position: {
                x:
                  widget.geometry.x + widget.geometry?.width / 2 + item.offsetX,
                y: widget.geometry.y + widget.geometry?.height + item.offsetY,
              },
              data: {
                ...item,
                type: item.value.type,
                parent: widget.id,
                geometry: {
                  x:
                    widget.geometry.x +
                    widget.geometry?.width / 2 +
                    item.offsetX,
                  y: widget.geometry.y + widget.geometry?.height + item.offsetY,
                  width: item.width || 100,
                  height: item.height || 60,
                },
              },
              arrowHeadType: ArrowHeadType.ArrowClosed,
            });
            elements.push({
              id: `${item.id}_${widget.id}`,
              source: widget.id,
              target: item.id,
              vertex: false,
              edge: true,
              connectable: true,
              type: 'special',
              sourceHandle: 'main',
              style: { stroke: '#006AE3', strokeWidth: 3, cursor: 'move' },
            });
          });
        }
      }
    });

    return elements;
  }, []);

  // const onExport = () => {
  //   if (reactFlowInstance) {
  //     localStorage.setItem(
  //       'alakine_widgets',
  //       JSON.stringify({ maxId, widgets })
  //     );
  //   }
  // };

  const onSave = useCallback(
    (id, values) => {
      dispatch(
        actions.saveWidget({
          id,
          value: values,
          geometry: {
            ...currentWidget.geometry,
            ...(values.width
              ? {
                  width: values.width,
                  height: values.height,
                }
              : {}),
          },
        })
      );
    },
    [dispatch, currentWidget]
  );

  const addEdge = (params) => {
    dispatch(actions.addEdge(params));
  };

  const onEdgeContextMenu = (event) => {
    event.preventDefault();
  };

  const elements = useMemo(() => {
    return mapToElements(widgets);
  }, [widgets, mapToElements]);

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        borderRadius: 10,
        height: screenHeight - 250,
        border: '1px solid #ccc',
      }}
    >
      <ReactFlow
        elements={elements}
        nodeTypes={{ special: WidgetView }}
        edgeTypes={{ special: Edge }}
        onElementsRemove={onElementsRemove}
        onConnect={addEdge}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
        deleteKeyCode={46}
        connectionLineType="step"
        onEdgeContextMenu={onEdgeContextMenu}
        nodesDraggable={false}
      >
        <Controls />
        <Background color="#aaa" gap={16} />
        {/* <Export onExport={onExport} /> */}
        <WidgetEditModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          widget={currentWidget}
          onSaveWidget={onSave}
        />
      </ReactFlow>
    </div>
  );
};

export default memo(DrawingBoard);
