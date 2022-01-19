import React from 'react';
import styled from 'styled-components';
import { Box as MuiBox } from '@material-ui/core';
import shortid from 'shortid';

import VertexSelectDialog from '../VertexSelectDialog';
import { ThemeProvider } from 'lib/providers';
import useDialog from 'lib/hooks/useDialog';
import { IconButton } from 'components/ui';
import colors from 'lib/colors';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'services/widget';

function VertexContainer(props) {
  const { geometry, value, addVertex, cell } = props;
  const vertexSelectDialog = useDialog();
  const widgets = useSelector(selectors.getWidgets);
  const dispatch = useDispatch();

  const handleAddVertex = async () => {
    const result = await vertexSelectDialog.open();
    if (result && result.data) {
      const id = shortid.generate();
      const children = widgets.filter(
        (w) => w.parentId && w.parentId === value.id
      );
      let geometry = {
        x: 10,
        y: 10,
        width: 180,
        height: 60,
        relative: true,
      };

      if (children.length) {
        geometry.y = children[children.length - 1].geometry?.y + 150;
        geometry.x = children[children.length - 1].geometry?.x;
        dispatch(
          actions.addEdge({
            source: children[children.length - 1].id,
            target: id,
          })
        );
      }

      if (
        geometry.y + geometry.height > value.geometry.height ||
        geometry.x + geometry.width > value.geometry.width
      ) {
        const parentGeometry = { ...value.geometry };
        if (geometry.y + geometry.height > value.geometry.height) {
          parentGeometry.height = geometry.y + geometry.height + 50;
        }

        if (geometry.x + geometry.width > value.geometry.width) {
          parentGeometry.width = geometry.x + geometry.width + 10;
        }
        dispatch(
          actions.saveWidget({
            id: value.id,
            geometry: parentGeometry,
          })
        );
      }

      addVertex({
        parentId: value.id,
        id,
        value: {
          type: result.data.type,
          id,
          parentId: value.id,
        },
        geometry,
      });
    }
  };
  return (
    <ThemeProvider>
      <div style={{ position: 'relative' }}>
        <SBlock geometry={geometry}>
          <MuiBox style={{ textAlign: 'center', zIndex: 1000 }}>
            <IconButton icon="plus" onClick={handleAddVertex} />
          </MuiBox>
        </SBlock>

        <VertexSelectDialog
          close={vertexSelectDialog.close}
          isOpen={vertexSelectDialog.isOpen}
          initialData={vertexSelectDialog.initialData}
          isInsideContainer={true}
        />
      </div>
    </ThemeProvider>
  );
}

export default VertexContainer;

const SBlock = styled(MuiBox)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${(props) => props.geometry?.width}px;
  height: ${(props) => props.geometry?.height}px;

  border-radius: 10px;
  border: 1px solid ${colors.blue100};
  box-shadow: 0 2px 4px 0 ${colors.gray002};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
