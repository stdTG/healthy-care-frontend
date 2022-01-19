import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Handle, Position, useStoreState } from 'react-flow-renderer';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { vertexTypesData } from 'lib/enums/vertexTypes';
import { Icon, Typography } from 'components/ui';
import WidgetEditModal from '../WidgetEditModal';
import { selectors, actions } from 'services/widget';
import { useDispatch, useSelector } from 'react-redux';
import { vertexTypes } from 'lib/enums/vertexTypes';
import Question from '../Widgets/Question';
import VertexContainer from '../../TabBuild/Vertex/VertexContainer';
import VertexReply from '../../TabBuild/Vertex/VertexReply';
import VertexQuestionnaire from '../../TabBuild/Vertex/VertexQuestionnaire';
import Resizer from '../Resizer';

let orgX;
let orgY;
let orgGeometry;
let orgId;

const WidgetView = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: value, id, selected } = props;
  const widgets = useSelector(selectors.getWidgets);
  const [, , zoom] = useStoreState((state) => state.transform);
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && elementRef.current.parentNode) {
      elementRef.current.parentNode.id = `rel_${id}`;
    }
  }, [id]);

  const hasConnect = useMemo(() => {
    return (
      value.type === vertexTypes?.choices ||
      value.type === vertexTypes?.conditionChild ||
      !!widgets.find((item) => item.edge && item.target === id)
    );
  }, [widgets, id, value]);

  const hasChildren = useMemo(() => {
    return !!widgets.find((item) => item.parentId === id);
  }, [widgets, id]);

  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const onSave = useCallback(
    (id, values) => {
      dispatch(
        actions.saveWidget({
          id,
          value: values,
          geometry: {
            ...value.geometry,
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
    [dispatch, value]
  );

  const onAdd = useCallback(
    (payload) => {
      dispatch(actions.addWidget(payload));
    },
    [dispatch]
  );

  const onRemove = useCallback(() => {
    dispatch(actions.removeWidgetOrAssociation({ id }));
  }, [dispatch, id]);

  const renderContent = useCallback(() => {
    if (!value) return <div />;
    const { geometry } = value;

    switch (value?.type) {
      case vertexTypes.question:
        return (
          <Container width={geometry.width} height={geometry.height}>
            <Question value={value} />
          </Container>
        );
      case vertexTypes.container:
        return (
          <Container
            width={geometry.width}
            height={geometry.height}
            padding={0}
            background={'transparent'}
          >
            <VertexContainer
              cell={{ children: hasChildren }}
              addVertex={onAdd}
              value={value}
              geometry={geometry}
            />
          </Container>
        );
      case vertexTypes.choices:
        return (
          <Container
            width={geometry.width}
            height={geometry.height}
            padding={0}
          >
            <VertexReply value={value} geometry={geometry} />
          </Container>
        );
      case vertexTypes.conditionChild:
        return (
          <Container
            width={geometry.width}
            height={geometry.height}
            padding={0}
          >
            <VertexReply value={value} geometry={geometry} />
          </Container>
        );
      case vertexTypes.questionnaire:
        return (
          <Container
            width={geometry.width}
            height={geometry.height}
            padding={0}
          >
            <VertexQuestionnaire value={value} geometry={geometry} />
          </Container>
        );
      default:
        return (
          <Container width={geometry.width} height={geometry.height}>
            <Box display="flex">
              <Typography
                variant="h5"
                style={{
                  color:
                    !!vertexTypesData[value.type] &&
                    vertexTypesData[value.type].color,
                }}
                gutterBottom
              >
                <Icon
                  icon={
                    !!vertexTypesData[value.type] &&
                    vertexTypesData[value.type].icon
                  }
                  size="1x"
                  mr={10}
                />
                {!!vertexTypesData[value.type] &&
                  vertexTypesData[value.type].text}
              </Typography>
            </Box>
            <Header>
              <Typography variant="h5" gutterBottom>
                {value.text}
              </Typography>
            </Header>
          </Container>
        );
    }
  }, [value]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!orgId || orgId !== value.id) return;

      const offsetX = e.pageX - orgX;
      const offsetY = e.pageY - orgY;
      const geometry = { ...orgGeometry };
      geometry.x = orgGeometry.x + offsetX / zoom;
      geometry.y = orgGeometry.y + offsetY / zoom;

      dispatch(
        actions.saveWidget({
          id: value.id,
          geometry,
        })
      );
    },
    [dispatch, value]
  );

  const checkContainer = useCallback(
    (e) => {
      const widget = widgets.find((item) => item.id === orgId);
      if (!widget || !widget.parentId) return;

      const parent = widgets.find((item) => item.id === widget.parentId);
      if (!parent) return;

      const offsetX = e.pageX - orgX;
      const offsetY = e.pageY - orgY;
      const geometry = { ...orgGeometry };
      geometry.x = orgGeometry.x + offsetX / zoom;
      geometry.y = orgGeometry.y + offsetY / zoom;
      if (geometry.x < 0) {
        geometry.x = 0;
      }
      if (geometry.y < 0) {
        geometry.y = 0;
      }
      if (geometry.x + geometry.width > parent.geometry.width) {
        geometry.x = parent.geometry.width - geometry.width;
      }
      if (geometry.y + geometry.height > parent.geometry.height) {
        geometry.y = parent.geometry.height - geometry.height;
      }

      dispatch(actions.saveWidget({ id: orgId, geometry }));
    },
    [widgets]
  );

  const handleMouseUp = useCallback(
    (e) => {
      checkContainer(e);
      orgX = undefined;
      orgY = undefined;
      orgGeometry = undefined;
      orgId = undefined;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    },
    [handleMouseMove, checkContainer]
  );

  const handleMouseDown = useCallback(
    (e) => {
      orgX = e.pageX;
      orgY = e.pageY;
      orgGeometry = { ...value.geometry };
      orgId = value.id;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [value, handleMouseUp, handleMouseMove]
  );

  if (!value) return <></>;

  if (value.parentId && elementRef.current && elementRef.current.parentNode) {
    const parentEl = document.getElementById(`rel_${value.parentId}`);
    elementRef.current.parentNode.style.zIndex =
      parseInt(parentEl?.style.zIndex, 10) + 1;
  }

  return (
    <Wrapper onDoubleClick={openModal} ref={elementRef}>
      {selected && (
        <div>
          <SelectionRect>
            <Resizer value={value} />
          </SelectionRect>
        </div>
      )}
      <div style={{ position: 'relative' }}>
        {value.type !== vertexTypes?.choices &&
          value.type !== vertexTypes.conditionChild && (
            <IconButton
              className="close-button"
              size="small"
              onClick={onRemove}
            >
              <CloseIcon fontSize="small" color="action" />
            </IconButton>
          )}
        <TargetHandle
          type="target"
          position={Position.Top}
          className={!hasConnect ? 'no-parent' : ''}
        />
        <div onMouseDown={handleMouseDown}>{renderContent()}</div>
        <SourceHandle id={id} type="source" position={Position.Bottom} />
        <WidgetEditModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          widget={value}
          onSaveWidget={onSave}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  .close-button {
    display: none;
    position: absolute;
    right: 0px;
    top: 0px;
    transform: translate(50%, -50%);
    background: white;
    border: 1px solid #a8a8a880;
    z-index: 10;

    .MuiIconButton-label {
      background: #a8a8a8;
      border-radius: 100%;
    }

    svg {
      color: white;
      width: 14px;
      height: 14px;
    }
  }
  &:hover {
    .close-button {
      display: block;
    }
  }
`;

const SelectionRect = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 1px dashed #3cfd3e;
`;

const Container = styled.div`
  background: ${(props) => props.background || 'white'};
  ${(props) => props.width && `width: ${props.width}px;`}
  ${(props) => props.height && `height: ${props.height}px;`}
  padding: ${(props) => (props.padding !== undefined ? props.padding : 15)}px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
`;

const SourceHandle = styled(Handle)`
  width: 20px !important;
  height: 20px !important;
  background: #006ae3 !important;
  left: 50% !important;
  top: 100% !important;
  transform: translate(-50%, -25%) !important;

  &::before {
    display: flex;
    content: '+';
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 1;
    font-weight: 900;
  }
`;

const TargetHandle = styled(Handle)`
  width: 0px !important;
  height: 0px !important;
  z-index: 20;

  &.no-parent {
    width: 14px !important;
    height: 14px !important;
    background: transparent;
    border: 1px dotted gray;
    transform: translate(-50%, -25%);

    &::before {
      display: none;
    }
  }

  &::before {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -8px);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 10px solid #006ae3;
  }
`;
export default WidgetView;
