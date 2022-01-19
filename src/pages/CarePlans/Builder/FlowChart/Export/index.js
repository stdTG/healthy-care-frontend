import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import { BiExport } from 'react-icons/bi';

const Export = ({ onExport }) => {
  return (
    <Tooltip
      title="export"
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      <IconButton onClick={onExport}>
        <BiExport size="1em" />
      </IconButton>
    </Tooltip>
  );
};

export default Export;
