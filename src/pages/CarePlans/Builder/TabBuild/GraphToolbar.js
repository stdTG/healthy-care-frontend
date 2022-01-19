import React, { useEffect } from 'react';
import { Button as MuiButton, Box as MuiBox } from '@material-ui/core';
import { IconButton } from 'components/ui';
import { useDispatch } from 'react-redux';
import useGetJson from '../../_service/hooks/useGetJson';
import { useTranslation } from 'react-i18next';

function GraphToolbar(props) {
  const { graph, onSave: save, data } = props;
  const dispatch = useDispatch();
  const cells = graph?.getChildCells().filter((cell) => cell.vertex);
  const { t } = useTranslation();

  const { getJson } = useGetJson(graph);
  // useEffect(() => {
  //   const json = JSON.stringify(JSON.parse(getJson()).graph);
  //   // console.log(json, 'JSOOOOON');
  //   dispatch(
  //     actions.setJson({
  //       uiJson: json,
  //     })
  //   );
  // }, [cells]);

  return (
    <MuiBox
      display="flex"
      flexDirection="column"
      style={{
        right: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <IconButton
        icon="plus"
        onClick={() => graph.zoomIn()}
        style={{ marginBottom: '10px' }}
      />

      <IconButton
        icon="dot-circle"
        onClick={() => graph.zoomActual()}
        style={{ marginBottom: '10px' }}
      />
      <IconButton
        icon="minus"
        onClick={() => graph.zoomOut()}
        style={{ marginBottom: '10px' }}
      />
      <MuiButton
        onClick={getJson}
        style={{ marginBottom: '10px', fontSize: '10px' }}
      >
        {t('Get JSON')}
      </MuiButton>
      {/*<MuiButton variant="outlined" onClick={onSave}>*/}
      {/*  Save*/}
      {/*</MuiButton>*/}
    </MuiBox>
  );
}

export default GraphToolbar;
